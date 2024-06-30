export interface IUser {
     userId: string;
     userImage: string;
     firstName: string;
     lastName?: string;
     username: string;
}

export interface UserProfile {
     backup_code_enabled: boolean;
     banned: boolean;
     create_organization_enabled: boolean;
     created_at: number;
     delete_self_enabled: boolean;
     email_addresses: [];
     external_accounts: [];
     external_id: string | null;
     first_name: string;
     has_image: boolean;
     id: string;
     image_url: string;
     last_active_at: number;
     last_name: string;
     last_sign_in_at: number;
     locked: boolean;
     lockout_expires_in_seconds: number | null;
     mfa_disabled_at: number | null;
     mfa_enabled_at: number | null;
     object: string; // Assuming 'object' is a string type
     passkeys: any[]; // Define type if possible
     password_enabled: boolean;
     phone_numbers: any[]; // Define type if possible
     primary_email_address_id: string;
     primary_phone_number_id: string | null;
     primary_web3_wallet_id: string | null;
     private_metadata: Record<string, any>;
     profile_image_url: string;
     public_metadata: Record<string, any>;
     saml_accounts: any[]; // Define type if possible
     totp_enabled: boolean;
     two_factor_enabled: boolean;
     unsafe_metadata: Record<string, any>;
     updated_at: number;
     username: string;
     verification_attempts_remaining: number;
     web3_wallets: any[]; // Define type if possible
 }