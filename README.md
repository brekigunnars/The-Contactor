
# Contactor

A simple React Native application to manage contacts. Users can create, edit, delete, view, and import contacts. The app allows optional photo uploads for contacts and includes the ability to call contacts directly through the device's dialer.

---

## Features

1. **Add Contacts**: Add a new contact with a name, phone number, and optional photo.
2. **View Contacts**: Display all saved contacts in alphabetical order.
3. **Edit Contacts**: Update contact details, including name, phone number, and photo.
4. **Delete Contacts**: Remove a contact permanently.
5. **Call Contacts**: Dial a contact's phone number directly using the OS's phone app.
6. **Import Contacts**: Import existing contacts from the OS into the app.
7. **Offline Storage**: All contacts are stored locally in the file system.

---

## Prerequisites

1. Node.js installed on your system.
2. Expo CLI installed globally (`npm install -g expo-cli`).
3. A compatible emulator (Android or iOS) or a physical device.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <https://github.com/brekigunnars/The-Contactor.git>
   cd Contactor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Run the app:
   - Use the Expo Go app to scan the QR code on your device.
   - Or, run the app in an emulator by selecting the desired platform in the Expo CLI (`a` for Android, `i` for iOS).

---

## Usage Instructions

### Add a Contact
1. Go to the "Home" screen.
2. Tap the "+" button.
3. Enter the contact's name and phone number (photo is optional).
4. Press "Done" to save the contact.

### View Contact Details
1. Tap on a contact in the list to view details.
2. Use the "Call" button to initiate a call.

### Edit a Contact
1. Long press on a contact and select "Edit."
2. Update the contact's information and press "Done."

### Delete a Contact
1. Long press on a contact and select "Delete."

### Import Contacts
1. Tap the "Import Contacts" button on the "Home" screen.
2. Imported contacts will appear in the list.

---

## Troubleshooting

1. **Permission Issues**:
   - Ensure you have granted the app access to the camera, media library, and contacts on your device.

2. **Errors During File Operations**:
   - Verify that the file system is accessible, and the `contacts/` directory exists.

3. **Duplicate Keys**:
   - Imported contacts are deduplicated automatically based on their unique IDs.

---

## License

This project is licensed under the MIT License.
