// Helper to convert string to field (simple hash simulation)
// In production, use proper cryptographic hash (BHP/Poseidon)
export const stringToField = (str: string): string => {
  // Simple hash simulation - in production use proper hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `${Math.abs(hash)}field`;
};

// Generate a random secret for nullifier derivation
export const generateSecret = (): string => {
  const random = Math.floor(Math.random() * 1000000000);
  return `${random}field`;
};

// Create credential commitment from form data
export const createCredentialCommitments = (formData: {
  name: string;
  type: string;
  issuer: string;
  dateIssued?: Date;
  notes?: string;
}) => {
  // Create payload string from form data
  const payload = JSON.stringify({
    name: formData.name,
    type: formData.type,
    issuer: formData.issuer || '',
    dateIssued: formData.dateIssued?.toISOString() || '',
    notes: formData.notes || '',
  });

  // Generate commitments (in production, use proper hash functions)
  const payload_commitment = stringToField(payload);
  const issuer_commitment = formData.issuer ? stringToField(formData.issuer) : '0field';
  const schema_commitment = stringToField(formData.type);

  return {
    payload_commitment,
    issuer_commitment,
    schema_commitment,
  };
};
