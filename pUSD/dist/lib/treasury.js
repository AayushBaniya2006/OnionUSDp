"use strict";
/**
 * TreasuryService.ts
 *
 * A robust client-side service for corporate treasury management with:
 * - Multisig corporate wallet holding pUSDC and USDC in escrow
 * - 1% fee on corporate withdrawals (profit generation)
 * - No fees for employee transactions
 * - Confidential pUSDC transactions (except minting/deposits)
 * - 30-minute revokable period for corporate-employee transactions
 * - Auto-generated or personal wallet support
 * - Yield wallet sub-account for future yield generation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasuryService = exports.PUSDC_DECIMALS = exports.USDC_DECIMALS = exports.PUSDC_MINT = exports.USDC_MINT = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const fs_1 = require("fs");
const path = __importStar(require("path"));
// Import confidential transfer utilities
const confidential = require('./confidential');
/**
 * Constants for USDC and pUSDC
 */
exports.USDC_MINT = new web3_js_1.PublicKey('6zNgemLNqvsTga2a4AoGKexuYG7zYWqRAtuf85JYDoXq');
exports.PUSDC_MINT = new web3_js_1.PublicKey('42YkeT6vc4DFmn2mPWg2wGoQtBTpNtqoEpJkU4dLZVRN');
exports.USDC_DECIMALS = 6;
exports.PUSDC_DECIMALS = 9;
const DECIMAL_MULTIPLIER = 10 ** (exports.PUSDC_DECIMALS - exports.USDC_DECIMALS);
// Token 2022 Program ID
const TOKEN_2022_PROGRAM_ID = new web3_js_1.PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
// Fee constants
const CORPORATE_WITHDRAWAL_FEE_BPS = 100; // 1% = 100 basis points
const REVOKABLE_PERIOD_SECONDS = 30 * 60; // 30 minutes
// Keypair paths
const TREASURY_KEYPAIR_PATH = path.resolve(__dirname, '../../keypairs/treasury.json');
const CORPORATE_MULTISIG_PATH = path.resolve(__dirname, '../../keypairs/corporate-multisig.json');
const YIELD_WALLET_PATH = path.resolve(__dirname, '../../keypairs/yield-wallet.json');
/**
 * Load existing or generate new keypair for the treasury authority.
 */
async function loadOrGenerateKeypair(keypairPath) {
    try {
        await fs_1.promises.mkdir(path.dirname(keypairPath), { recursive: true });
        const exists = await fs_1.promises.stat(keypairPath).then(() => true).catch(() => false);
        if (exists) {
            const secret = JSON.parse(await fs_1.promises.readFile(keypairPath, 'utf-8'));
            return web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secret));
        }
        const kp = web3_js_1.Keypair.generate();
        await fs_1.promises.writeFile(keypairPath, JSON.stringify(Array.from(kp.secretKey)));
        return kp;
    }
    catch (err) {
        throw new Error(`Failed loading keypair: ${err.message}`);
    }
}
/**
 * Ensure a Token 2022 associated token account exists for a given mint and owner.
 */
async function getOrCreateToken2022ATA(connection, mint, owner, payer) {
    const ata = await (0, spl_token_1.getAssociatedTokenAddress)(mint, owner, false, TOKEN_2022_PROGRAM_ID);
    const info = await connection.getAccountInfo(ata);
    if (info)
        return ata;
    const ix = (0, spl_token_1.createAssociatedTokenAccountInstruction)(payer.publicKey, ata, owner, mint, TOKEN_2022_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    const tx = new web3_js_1.Transaction({
        feePayer: payer.publicKey,
        blockhash,
        lastValidBlockHeight,
    }).add(ix);
    await (0, web3_js_1.sendAndConfirmTransaction)(connection, tx, [payer]);
    return ata;
}
/**
 * Convert UI amount to atomic units, enforcing integer representation.
 */
function toAtomic(amount, decimals) {
    const units = amount * 10 ** decimals;
    if (!Number.isInteger(units) || units < 0) {
        throw new Error(`Invalid amount ${amount} for decimals ${decimals}`);
    }
    return BigInt(units);
}
/**
 * Calculate fee amount in basis points
 */
function calculateFee(amount, feeBps) {
    return (amount * BigInt(feeBps)) / BigInt(10000);
}
/**
 * Enhanced TreasuryService for corporate treasury management
 */
class TreasuryService {
    constructor(connection) {
        this.connection = connection;
        this.revokableTransactions = new Map();
        // Add public access to constants
        this.PUSDC_MINT = exports.PUSDC_MINT;
        this.USDC_MINT = exports.USDC_MINT;
    }
    /**
     * Initialize all treasury components
     */
    async init() {
        // Load keypairs
        this.treasuryKeypair = await loadOrGenerateKeypair(TREASURY_KEYPAIR_PATH);
        this.corporateMultisig = await loadOrGenerateKeypair(CORPORATE_MULTISIG_PATH);
        this.yieldWallet = await loadOrGenerateKeypair(YIELD_WALLET_PATH);
        this.treasuryAuthority = this.treasuryKeypair.publicKey;
        this.corporateAuthority = this.corporateMultisig.publicKey;
        this.yieldAuthority = this.yieldWallet.publicKey;
        // Create ATAs for all components using Token 2022
        this.treasuryUSDC = await getOrCreateToken2022ATA(this.connection, exports.USDC_MINT, this.treasuryAuthority, this.treasuryKeypair);
        this.corporateUSDC = await getOrCreateToken2022ATA(this.connection, exports.USDC_MINT, this.corporateAuthority, this.treasuryKeypair);
        this.yieldUSDC = await getOrCreateToken2022ATA(this.connection, exports.USDC_MINT, this.yieldAuthority, this.treasuryKeypair);
        this.yieldPUSDC = await getOrCreateToken2022ATA(this.connection, exports.PUSDC_MINT, this.yieldAuthority, this.treasuryKeypair);
        // Verify initial invariant
        if (!(await this.checkPegInvariant())) {
            console.warn('Warning: pUSDC supply does not match collateral reserves at init');
        }
    }
    /**
     * Generate a new employee wallet
     */
    async generateEmployeeWallet(branchId) {
        const keypair = web3_js_1.Keypair.generate();
        const account = {
            publicKey: keypair.publicKey,
            isEmployee: true,
            isCorporate: false,
            branchId,
            createdAt: new Date(),
        };
        // Save employee keypair
        const employeePath = path.resolve(__dirname, `../../keypairs/employee-${branchId}-${Date.now()}.json`);
        await fs_1.promises.writeFile(employeePath, JSON.stringify(Array.from(keypair.secretKey)));
        return { keypair, account };
    }
    /**
     * Register an existing wallet as an employee
     */
    registerEmployeeWallet(publicKey, branchId) {
        return {
            publicKey,
            isEmployee: true,
            isCorporate: false,
            branchId,
            createdAt: new Date(),
        };
    }
    /**
     * Corporate deposit USDC and mint pUSDC (no fees)
     */
    async buildCorporateDepositTx(user, uiAmount) {
        if (uiAmount <= 0)
            throw new Error('Deposit amount must be positive');
        const usdcUnits = toAtomic(uiAmount, exports.USDC_DECIMALS);
        const pusdcUnits = usdcUnits * BigInt(DECIMAL_MULTIPLIER);
        // Fetch balances using Token 2022 ATAs
        const userUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.USDC_MINT, user, this.treasuryKeypair);
        const userPUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.PUSDC_MINT, user, this.treasuryKeypair);
        const userBal = await this.connection.getTokenAccountBalance(userUSDCATA).then(r => BigInt(r.value.amount));
        if (userBal < usdcUnits)
            throw new Error('Insufficient USDC balance');
        // Load pUSDC mint authority
        const pusdcMintAuthority = await loadOrGenerateKeypair(path.resolve(__dirname, '../../keypairs/pusdc-mint.json'));
        // Build tx
        const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
        const tx = new web3_js_1.Transaction({
            feePayer: user,
            blockhash,
            lastValidBlockHeight,
        })
            .add((0, spl_token_1.createTransferInstruction)(userUSDCATA, this.corporateUSDC, user, Number(usdcUnits), [], TOKEN_2022_PROGRAM_ID))
            .add((0, spl_token_1.createMintToInstruction)(exports.PUSDC_MINT, userPUSDCATA, pusdcMintAuthority.publicKey, Number(pusdcUnits), [], TOKEN_2022_PROGRAM_ID));
        return { tx, signers: [pusdcMintAuthority] };
    }
    /**
     * Corporate withdraw pUSDC for USDC (with 1% fee)
     */
    async buildCorporateWithdrawTx(user, uiAmount) {
        if (uiAmount <= 0)
            throw new Error('Withdraw amount must be positive');
        const pusdcUnits = toAtomic(uiAmount, exports.PUSDC_DECIMALS);
        const usdcUnits = toAtomic(uiAmount, exports.USDC_DECIMALS);
        const feeAmount = calculateFee(usdcUnits, CORPORATE_WITHDRAWAL_FEE_BPS);
        const netUsdcAmount = usdcUnits - feeAmount;
        // Fetch balances using Token 2022 ATAs
        const userPUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.PUSDC_MINT, user, this.treasuryKeypair);
        const userPBal = await this.connection.getTokenAccountBalance(userPUSDCATA).then(r => BigInt(r.value.amount));
        if (userPBal < pusdcUnits)
            throw new Error('Insufficient pUSDC balance');
        const corporateBal = await this.connection.getTokenAccountBalance(this.corporateUSDC).then(r => BigInt(r.value.amount));
        if (corporateBal < usdcUnits)
            throw new Error('Corporate treasury undercollateralized');
        const userUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.USDC_MINT, user, this.treasuryKeypair);
        // Build tx with revokable approval
        const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
        const expiresAt = new Date(Date.now() + REVOKABLE_PERIOD_SECONDS * 1000);
        const tx = new web3_js_1.Transaction({
            feePayer: user,
            blockhash,
            lastValidBlockHeight,
        })
            .add((0, spl_token_1.createBurnInstruction)(userPUSDCATA, exports.PUSDC_MINT, user, Number(pusdcUnits), [], TOKEN_2022_PROGRAM_ID))
            .add((0, spl_token_1.createTransferInstruction)(this.corporateUSDC, userUSDCATA, this.corporateAuthority, Number(netUsdcAmount), [], TOKEN_2022_PROGRAM_ID))
            .add((0, spl_token_1.createTransferInstruction)(this.corporateUSDC, this.yieldUSDC, this.corporateAuthority, Number(feeAmount), [], TOKEN_2022_PROGRAM_ID));
        const transactionId = `${user.toBase58()}-${Date.now()}`;
        const corporateTx = {
            signature: '',
            from: user,
            to: this.corporateAuthority,
            amount: uiAmount,
            timestamp: new Date(),
            expiresAt,
            isRevoked: false,
        };
        this.revokableTransactions.set(transactionId, corporateTx);
        return { tx, signers: [this.corporateMultisig], transactionId };
    }
    /**
     * Employee deposit USDC and mint pUSDC (no fees)
     */
    async buildEmployeeDepositTx(user, uiAmount) {
        if (uiAmount <= 0)
            throw new Error('Deposit amount must be positive');
        const usdcUnits = toAtomic(uiAmount, exports.USDC_DECIMALS);
        const pusdcUnits = usdcUnits * BigInt(DECIMAL_MULTIPLIER);
        // Fetch balances using Token 2022 ATAs
        const userUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.USDC_MINT, user, this.treasuryKeypair);
        const userPUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.PUSDC_MINT, user, this.treasuryKeypair);
        const userBal = await this.connection.getTokenAccountBalance(userUSDCATA).then(r => BigInt(r.value.amount));
        if (userBal < usdcUnits)
            throw new Error('Insufficient USDC balance');
        // Load pUSDC mint authority
        const pusdcMintAuthority = await loadOrGenerateKeypair(path.resolve(__dirname, '../../keypairs/pusdc-mint.json'));
        // Build tx
        const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
        const tx = new web3_js_1.Transaction({
            feePayer: user,
            blockhash,
            lastValidBlockHeight,
        })
            .add((0, spl_token_1.createTransferInstruction)(userUSDCATA, this.treasuryUSDC, user, Number(usdcUnits), [], TOKEN_2022_PROGRAM_ID))
            .add((0, spl_token_1.createMintToInstruction)(exports.PUSDC_MINT, userPUSDCATA, pusdcMintAuthority.publicKey, Number(pusdcUnits), [], TOKEN_2022_PROGRAM_ID));
        return { tx, signers: [pusdcMintAuthority] };
    }
    /**
     * Employee withdraw pUSDC for USDC (no fees)
     */
    async buildEmployeeWithdrawTx(user, uiAmount) {
        if (uiAmount <= 0)
            throw new Error('Withdraw amount must be positive');
        const pusdcUnits = toAtomic(uiAmount, exports.PUSDC_DECIMALS);
        const usdcUnits = toAtomic(uiAmount, exports.USDC_DECIMALS);
        // Fetch balances using Token 2022 ATAs
        const userPUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.PUSDC_MINT, user, this.treasuryKeypair);
        const userPBal = await this.connection.getTokenAccountBalance(userPUSDCATA).then(r => BigInt(r.value.amount));
        if (userPBal < pusdcUnits)
            throw new Error('Insufficient pUSDC balance');
        const treasuryBal = await this.connection.getTokenAccountBalance(this.treasuryUSDC).then(r => BigInt(r.value.amount));
        if (treasuryBal < usdcUnits)
            throw new Error('Treasury undercollateralized');
        const userUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.USDC_MINT, user, this.treasuryKeypair);
        // Build tx
        const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
        const tx = new web3_js_1.Transaction({
            feePayer: user,
            blockhash,
            lastValidBlockHeight,
        })
            .add((0, spl_token_1.createBurnInstruction)(userPUSDCATA, exports.PUSDC_MINT, user, Number(pusdcUnits), [], TOKEN_2022_PROGRAM_ID))
            .add((0, spl_token_1.createTransferInstruction)(this.treasuryUSDC, userUSDCATA, this.treasuryAuthority, Number(usdcUnits), [], TOKEN_2022_PROGRAM_ID));
        return { tx, signers: [this.treasuryKeypair] };
    }
    /**
     * Revoke a corporate transaction within the 30-minute window
     */
    async revokeCorporateTransaction(transactionId) {
        const transaction = this.revokableTransactions.get(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        if (transaction.isRevoked) {
            throw new Error('Transaction already revoked');
        }
        if (new Date() > transaction.expiresAt) {
            throw new Error('Transaction has expired and cannot be revoked');
        }
        transaction.isRevoked = true;
        this.revokableTransactions.set(transactionId, transaction);
        // TODO: Implement actual transaction revocation on-chain
        console.log(`Transaction ${transactionId} marked for revocation`);
        return true;
    }
    /**
     * Get all revokable transactions
     */
    getRevokableTransactions() {
        return Array.from(this.revokableTransactions.values());
    }
    /**
     * Get yield wallet balances
     */
    async getYieldBalances() {
        const usdcBal = await this.connection.getTokenAccountBalance(this.yieldUSDC).then(r => r.value.uiAmountString || '0');
        const pusdcBal = await this.connection.getTokenAccountBalance(this.yieldPUSDC).then(r => r.value.uiAmountString || '0');
        return { usdc: usdcBal, pusdc: pusdcBal };
    }
    /**
     * Check if total pUSDC supply equals USDC reserves × multiplier.
     */
    async checkPegInvariant() {
        const mintInfo = await (0, spl_token_1.getMint)(this.connection, exports.PUSDC_MINT);
        const totalSupply = BigInt(mintInfo.supply.toString());
        const treasuryReserves = BigInt((await this.connection.getTokenAccountBalance(this.treasuryUSDC)).value.amount);
        const corporateReserves = BigInt((await this.connection.getTokenAccountBalance(this.corporateUSDC)).value.amount);
        const totalReserves = treasuryReserves + corporateReserves;
        return totalSupply === totalReserves * BigInt(DECIMAL_MULTIPLIER);
    }
    /**
     * Legacy redeem method for backward compatibility
     */
    async redeemPUSDC(userKeypair, uiAmount) {
        const { tx, signers } = await this.buildEmployeeWithdrawTx(userKeypair.publicKey, uiAmount);
        const signature = await (0, web3_js_1.sendAndConfirmTransaction)(this.connection, tx, [userKeypair, ...signers]);
        return signature;
    }
    /**
     * Corporate to Employee confidential pUSDC transfer using CLI
     */
    async executeCorporateToEmployeeConfidentialTransfer(corporateUser, employeeUser, uiAmount) {
        if (uiAmount <= 0)
            throw new Error('Transfer amount must be positive');
        // Get the employee's pUSDC account
        const employeePUSDCATA = await getOrCreateToken2022ATA(this.connection, exports.PUSDC_MINT, employeeUser, this.treasuryKeypair);
        // Configure employee account for confidential transfers
        try {
            await this.configureAccountForConfidentialTransfers(employeePUSDCATA);
        }
        catch (error) {
            console.warn('Warning: Could not configure employee account for confidential transfers:', error);
        }
        // Execute confidential transfer using CLI
        console.log(`🔒 Executing confidential transfer from corporate to employee ${employeeUser.toBase58()}`);
        const result = confidential.transferConfidentialTokens(exports.PUSDC_MINT.toBase58(), uiAmount, employeePUSDCATA.toBase58());
        const transactionId = `${corporateUser.toBase58()}-${employeeUser.toBase58()}-${Date.now()}`;
        const corporateTx = {
            signature: result,
            from: corporateUser,
            to: employeeUser,
            amount: uiAmount,
            timestamp: new Date(),
            expiresAt: new Date(Date.now() + REVOKABLE_PERIOD_SECONDS * 1000),
            isRevoked: false,
        };
        this.revokableTransactions.set(transactionId, corporateTx);
        console.log('🔒 Confidential transfer executed:', result);
        return { transactionId, result };
    }
    /**
     * Configure a token account for confidential transfers
     */
    async configureAccountForConfidentialTransfers(accountPubkey) {
        try {
            console.log(`🔧 Configuring account ${accountPubkey.toBase58()} for confidential transfers...`);
            const result = confidential.configureConfidentialAccount(accountPubkey.toBase58());
            console.log(`✅ Account configured: ${result}`);
        }
        catch (error) {
            console.warn(`Failed to configure account ${accountPubkey.toBase58()} for confidential transfers:`, error);
            throw error;
        }
    }
    /**
     * Deposit tokens into confidential balance
     */
    async depositConfidentialTokens(accountPubkey, uiAmount) {
        if (uiAmount <= 0)
            throw new Error('Deposit amount must be positive');
        try {
            console.log(`🔒 Depositing ${uiAmount} pUSDC into confidential balance for ${accountPubkey.toBase58()}`);
            const result = confidential.depositConfidentialTokens(exports.PUSDC_MINT.toBase58(), uiAmount, accountPubkey.toBase58());
            console.log('✅ Confidential deposit executed:', result);
            return result;
        }
        catch (error) {
            throw new Error(`Confidential deposit failed: ${error}`);
        }
    }
    /**
     * Apply pending balance to make confidential tokens visible
     */
    async applyPendingBalance(accountPubkey) {
        try {
            console.log(`🔄 Applying pending balance for ${accountPubkey.toBase58()}`);
            const result = confidential.applyPendingBalance(accountPubkey.toBase58());
            console.log('✅ Pending balance applied:', result);
            return result;
        }
        catch (error) {
            throw new Error(`Apply pending balance failed: ${error}`);
        }
    }
    /**
     * Withdraw confidential tokens to public balance
     */
    async withdrawConfidentialTokens(accountPubkey, uiAmount) {
        if (uiAmount <= 0)
            throw new Error('Withdraw amount must be positive');
        try {
            console.log(`🔒 Withdrawing ${uiAmount} pUSDC from confidential balance for ${accountPubkey.toBase58()}`);
            const result = confidential.withdrawConfidentialTokens(exports.PUSDC_MINT.toBase58(), uiAmount, accountPubkey.toBase58());
            console.log('✅ Confidential withdrawal executed:', result);
            return result;
        }
        catch (error) {
            throw new Error(`Confidential withdrawal failed: ${error}`);
        }
    }
    /**
     * Legacy method for backward compatibility - now uses CLI
     */
    async buildCorporateToEmployeeTransferTx(corporateUser, employeeUser, uiAmount) {
        // This method now delegates to the CLI-based confidential transfer
        const { transactionId } = await this.executeCorporateToEmployeeConfidentialTransfer(corporateUser, employeeUser, uiAmount);
        // Return a dummy transaction since we're using CLI
        const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
        const tx = new web3_js_1.Transaction({
            feePayer: corporateUser,
            blockhash,
            lastValidBlockHeight,
        });
        return { tx, signers: [], transactionId };
    }
    /**
     * Legacy method for backward compatibility - now uses CLI
     */
    async executeConfidentialTransfer(fromAccount, toAccount, uiAmount) {
        // This method now delegates to the CLI-based confidential transfer
        const { result } = await this.executeCorporateToEmployeeConfidentialTransfer(fromAccount, toAccount, uiAmount);
        return result;
    }
}
exports.TreasuryService = TreasuryService;
