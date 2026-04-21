export interface FieldPreset {
  label: string;
  value: string;
  aliases: string[];
}

export const REGISTRATION_PRESETS: FieldPreset[] = [
  {
    label: "Email",
    value: "",
    aliases: ["email", "e-mail", "user_email", "login", "user_id", "email_address"]
  },
  {
    label: "First Name",
    value: "",
    aliases: ["first_name", "firstname", "fname", "f_name", "first", "given-name", "name"]
  },
  {
    label: "Last Name",
    value: "",
    aliases: ["last_name", "lastname", "lname", "l_name", "last", "surname", "family-name"]
  },
  {
    label: "Full Name",
    value: "",
    aliases: ["full_name", "fullname", "name", "display_name", "username"]
  },
  {
    label: "Password",
    value: "",
    aliases: ["password", "pass", "pwd", "user_password", "new-password"]
  },
  {
    label: "Phone",
    value: "",
    aliases: ["phone", "telephone", "mobile", "tel", "cell", "phone_number", "contact_number"]
  }
];

export const JOB_PRESETS: FieldPreset[] = [
  {
    label: "LinkedIn URL",
    value: "",
    aliases: ["linkedin", "linkedin_url", "social_linkedin", "url_linkedin"]
  },
  {
    label: "Portfolio URL",
    value: "",
    aliases: ["portfolio", "website", "portfolio_url", "personal_website", "blog"]
  },
  {
    label: "GitHub URL",
    value: "",
    aliases: ["github", "github_url", "social_github"]
  },
  {
    label: "Job Title",
    value: "",
    aliases: ["job_title", "title", "position", "current_role", "role"]
  },
  {
    label: "Company",
    value: "",
    aliases: ["company", "organization", "corp", "current_company", "employer"]
  },
  {
    label: "City",
    value: "",
    aliases: ["city", "town", "location", "address_city"]
  },
  {
    label: "Country",
    value: "",
    aliases: ["country", "nation", "address_country"]
  },
  {
    label: "Experience (Years)",
    value: "",
    aliases: ["experience", "exp", "years_exp", "years_of_experience", "total_exp"]
  }
];

export const ALL_PRESETS = [...REGISTRATION_PRESETS, ...JOB_PRESETS];
