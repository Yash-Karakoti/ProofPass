# Aleo Integration Guide

## Overview

The frontend is now integrated with the Aleo Leo program (`proofpass_plus.aleo`). The **Create Credential** function is fully functional and connects to the Aleo backend.

## What's Working

✅ **Create Credential** - Fully integrated with Aleo
- Connects to Aleo wallet (or creates demo account)
- Generates credential commitments from form data
- Calls `create_credential` transition on the Leo program
- Stores credential record locally

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Leo Program

```bash
cd aleo/proofpass_plus
leo build
```

### 3. Run the Frontend

```bash
npm run dev
```

### 4. Connect Wallet

1. Click "Connect Wallet" in the header
2. If you have Leo Wallet extension installed, it will connect automatically
3. Otherwise, a demo account will be created for testing

### 5. Create a Credential

1. Navigate to "Create Credential" page
2. Fill in the form (name and type are required)
3. Click "Create Credential"
4. The credential will be created on Aleo and stored locally

## Important Notes

### Local Execution vs Testnet Deployment

- **Local Execution**: The current implementation uses `ProgramManager.execute()` which works for local testing
- **Testnet Deployment**: For production use, you'll need to:
  1. Deploy the Leo program to Aleo testnet: `leo deploy`
  2. Update `PROGRAM_ID` in `src/lib/aleo.ts` with your deployed program ID
  3. Configure network endpoints in `ProgramManager`

### Wallet Integration

- The app checks for Leo Wallet browser extension first
- Falls back to creating a demo account if no extension is found
- Demo accounts are stored in localStorage (for development only)

### Error Handling

- All Aleo operations include error handling
- User-friendly error messages are displayed via toast notifications
- Check browser console for detailed error logs

## Next Steps

To integrate more functions:

1. **Generate Proof**: Update `GenerateProof.tsx` to use `generateProofOnAleo()`
2. **Verify Proof**: Update `VerifyProof.tsx` to use `verifyProofOnAleo()`
3. **My Credentials**: Update to load credentials from localStorage/Aleo

## Troubleshooting

### "Program not found" errors
- Make sure the Leo program is built: `cd aleo/proofpass_plus && leo build`
- Check that `PROGRAM_ID` in `src/lib/aleo.ts` matches your program name

### Wallet connection issues
- Check browser console for errors
- Try refreshing the page
- For production, ensure Leo Wallet extension is installed

### Transaction failures
- Check that you have sufficient credits (for testnet)
- Verify network connectivity
- Check browser console for detailed error messages
