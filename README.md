# AutoFill Pro - Firefox Extension

Minimalist Firefox extension to automatically fill form fields based on predefined key-value pairs and alias intelligence.

## Features
- **One-Click Fill**: Click the extension icon in the toolbar to fill the active form.
- **Smart Alias Matching**: Matches fields by `name`, `id`, `placeholder`, and `aria-label` using a list of common aliases.
- **Persistent Storage**: Data is saved securely in your browser's local storage.
- **Presets**: Pre-loaded sets of common field names for registration and job applications.
- **Premium Design**: Minimalist and clean UI for settings.

## How to Install (Developer Mode)

1. **Clone/Download** this repository.
2. **Build the extension**:
   ```bash
   npm install
   npm run build
   ```
3. **Open Firefox** and navigate to `about:debugging`.
4. Click on **"This Firefox"** in the left sidebar.
5. Click the **"Load Temporary Add-on..."** button.
6. Navigate to the `dist` folder of this project and select the `manifest.json` file.
7. The **AutoFill Pro** icon should now appear in your toolbar (you might need to pin it from the puzzle icon).

## How to Use

1. **Configure Data**: Right-click the extension icon and select **"Options"** (or click the puzzle icon -> AutoFill Pro -> Options) to set your values.
2. **Presets**: Use the "Load Registration Presets" or "Load Job Vacancy Presets" buttons to quickly add common fields.
3. **Save**: Click "Save Changes" after editing.
4. **Fill Forms**: On any website, click the **AutoFill Pro** icon in your toolbar to fill currently empty fields in the active form.

## Technology Stack
- **TypeScript**: Type-safe logic.
- **Vite**: Modern build tool.
- **Vitest**: Unit testing for matching logic.
- **WebExtension API**: Compatible with modern Firefox standards (MV3).
