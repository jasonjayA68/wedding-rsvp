#!/usr/bin/env node
/**
 * Generate a password hash for an admin row.
 *
 *   npm run hash-password -- 'your-strong-password'
 *
 * Copy the printed `saltHex:hashHex` value into your admins insert (see
 * supabase/schema.sql). This MUST match the format in lib/auth/password.ts.
 */
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash-password -- 'your-password'");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Please choose a password of at least 8 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(`${salt.toString("hex")}:${hash.toString("hex")}`);
