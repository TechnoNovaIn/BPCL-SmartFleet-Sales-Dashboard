# BPCL SmartFleet Dashboard

This project is a BPCL SmartFleet dashboard for viewing and analysing fuel transaction reports.

This guide explains how to run the project on a Windows 10 or Windows 11 computer. The steps are written for beginners.

## 1. Files in this project

The main project files are:

| File | What it does |
|---|---|
| `BPCL_API_Dashboard.html` | The dashboard page that you see in your browser |
| `Server.js` | Starts a local web server and connects dashboard requests to the BPCL API |
| `start.bat` | Starts the server and opens the dashboard in your browser |

The server uses Node.js built-in features. **You do not need to run `npm install` for this project.**

## 2. What you need

Before starting, you need:

- Windows 10 or Windows 11.
- An internet connection.
- Node.js version 18 or newer.
- Valid BPCL SmartFleet API access.
- Your BPCL SmartFleet username and password.

The dashboard uses the BPCL API host `api.cep.bpcl.in`. Your BPCL account must be authorised to access the requested reports.

## 3. Install Node.js

If Node.js is already installed, go to Step 4.

1. Open https://nodejs.org/ in your browser.
2. Download the **LTS** version for Windows.
3. Open the downloaded installer.
4. Click **Next**.
5. Accept the licence agreement.
6. Keep the default options.
7. Click **Install**.
8. When installation is complete, click **Finish**.

### Check the installation

1. Press the Windows key.
2. Type `cmd`.
3. Open **Command Prompt**.
4. Type:

```cmd
node --version
```

5. Press Enter.

You should see a version number, such as `v20.x.x` or newer.

If Windows says that `node` is not recognised, restart your computer and try again. If it still does not work, install Node.js again.

## 4. Extract the ZIP file

1. Find `BPCL DASHBOARD.zip` on your computer.
2. Right-click it.
3. Select **Extract All**.
4. Choose an easy folder location, for example:

```text
C:\BPCL-Dashboard
```

5. Click **Extract**.

Open the extracted folder. You should see:

```text
BPCL-Dashboard/
│
├── BPCL_API_Dashboard.html
├── Server.js
├── start.bat
└── README.md
```

The three original project files must stay together in the same folder.

## 5. Start the dashboard

1. Open the extracted `BPCL-Dashboard` folder.
2. Double-click `start.bat`.
3. A black Command Prompt window will open.
4. Wait for a message similar to:

```text
BPCL Dashboard running at http://localhost:3000
Keep this window open while using the dashboard.
```

5. Your browser should open the dashboard.

If the browser does not open automatically:

1. Open Google Chrome or Microsoft Edge.
2. Enter this address:

```text
http://localhost:3000
```

3. Press Enter.

**Important:** Keep the black Command Prompt window open while using the dashboard. If you close it, the local server stops and the dashboard cannot connect through it.

## 6. Sign in to BPCL

1. Open the dashboard at `http://localhost:3000`.
2. Enter your authorised BPCL SmartFleet username.
3. Enter your BPCL SmartFleet password.
4. Follow the dashboard's login instructions.

The dashboard uses BPCL API application settings that are configured in the HTML file. The username and password are entered on the login screen.

If login fails, check your BPCL username and password and confirm that your account has API/report access.

## 7. Load and view reports

After login:

1. Select the report settings shown on the dashboard.
2. Select the report type and file format, where required.
3. Select the required date period.
4. Click the dashboard's report/download button.
5. Wait for the report to load.
6. Review the transaction data and dashboard summaries.
7. Use the available filters and export options.

The report fields and available dates depend on the BPCL API response and your account permissions.

## 8. October 2026 sample data (optional)

The server has an optional route to load an October 2026 Excel file using the dashboard's October data button.

**The Excel file is not included in this ZIP folder.** If you want to use that feature, place the correct Excel report in one of these locations:

- One folder above the `BPCL-Dashboard` folder, with this exact filename:

```text
BPCL_Data_FA2000597425_2026-10-01_to_2026-10-31.xlsx
```

- Or inside the `BPCL-Dashboard` folder with the same filename.

The server also checks for `BPCL_Vinayaka_October_2026_Report.xlsx` one folder above the dashboard folder.

If the file is not present, the October sample-data button will show an error. You can still use the normal BPCL API report feature.

## 9. Open the dashboard from another computer on the same office Wi-Fi

The server currently listens on port `3000` and is configured to listen on the computer's network interfaces.

To try it from another computer:

1. Start the dashboard on the main Windows computer.
2. On the main computer, press the Windows key and type `cmd`.
3. Open Command Prompt and run:

```cmd
ipconfig
```

4. Find the active Wi-Fi or Ethernet connection.
5. Note the **IPv4 Address**, for example `192.168.1.10`.
6. On the other computer connected to the same office network, open Chrome or Edge.
7. Enter the address using the IP address from your computer:

```text
http://192.168.1.10:3000
```

Replace `192.168.1.10` with the actual IPv4 address shown on your computer.

The main computer must remain switched on and `start.bat` must remain running.

If the other computer cannot connect:

- Confirm both computers are on the same office network.
- Allow Node.js through Windows Firewall on a trusted private network, if Windows asks.
- Ask your IT administrator to allow incoming TCP connections on port `3000`.
- Check that the server window is still open.

**Security:** Do not expose this dashboard or port directly to the public internet. Use it only on a trusted network unless an administrator has configured secure remote access.

## 10. Stop the dashboard

1. Go to the black Command Prompt window.
2. Press `Ctrl + C`.
3. The server will stop.
4. Close the window if it remains open.

## 11. Common problems

### Problem: `node` is not recognised

**Solution:** Install Node.js from https://nodejs.org/. Restart Windows and check `node --version` again.

### Problem: The browser says it cannot connect

**Solution:**

- Check that `start.bat` is running.
- Keep the black Command Prompt window open.
- Open `http://localhost:3000`.
- Check whether the Command Prompt window shows a server error.

### Problem: BPCL login fails

**Solution:**

- Check your BPCL username and password.
- Check your internet connection.
- Confirm that the BPCL account is active.
- Confirm that the account has access to SmartFleet API reports.
- Check the error message displayed by the dashboard.

### Problem: HTTP 401 error

**Meaning:** BPCL did not accept the login or access token.

**Solution:** Check the login details and API application access. Sign in again if the session has expired.

### Problem: HTTP 403 error

**Meaning:** The BPCL service may be refusing access.

**Solution:** Contact the BPCL API administrator and ask them to check your account permissions, application credentials, and network/IP restrictions.

### Problem: HTTP 502 or proxy error

**Meaning:** The local server could not reach the BPCL API.

**Solution:**

- Check the internet connection.
- Check whether the BPCL API service is available.
- Check the black Command Prompt window for the proxy error.
- Try again later if the BPCL service is temporarily unavailable.

### Problem: October sample data is not loading

**Solution:** The required October Excel file may be missing or may have a different filename. Follow Step 8.

## 12. GitHub security warning — read before uploading

**Do not upload this ZIP or its current Git history to a public GitHub repository as it is.**

The dashboard HTML file contains a BPCL client secret in its JavaScript code. A secret inside browser-side HTML is visible to anyone who opens the page. The ZIP also contains a `.git` folder, which may preserve earlier versions of files and exposed credentials.

Before publishing this project:

1. Ask the BPCL/API administrator to rotate or replace the client secret that is currently in the HTML file.
2. Move confidential API credentials to a protected server-side configuration, such as environment variables. Do not send client secrets to the browser.
3. Keep real `.env` files and credential files out of GitHub. Add them to `.gitignore`.
4. Use a `.env.example` file with placeholder values only.
5. Remove the existing `.git` history from the copy you plan to publish, or carefully clean the repository history after rotating the exposed credentials. Simply deleting a secret from the latest file does not remove it from old commits.
6. Never put real passwords, client secrets, or access tokens in this README, screenshots, or GitHub issues.

A private GitHub repository is not a replacement for secure credential storage.

## 13. Project folder example

After adding this README, the folder can look like this:

```text
BPCL-Dashboard/
│
├── BPCL_API_Dashboard.html
├── Server.js
├── start.bat
└── README.md
```

The optional October Excel report can be stored in one of the locations explained in Step 8. Do not upload customer or transaction data to a public repository.

## 14. Quick start

After Node.js is installed:

1. Extract `BPCL DASHBOARD.zip`.
2. Open the extracted folder.
3. Double-click `start.bat`.
4. Wait for the server message.
5. Open `http://localhost:3000` if the browser does not open automatically.
6. Sign in using your BPCL SmartFleet account.
7. Select the report settings and load the data.
8. Keep the black Command Prompt window open while using the dashboard.

---

**Project:** BPCL SmartFleet Dashboard  
**Platform:** Windows 10 / Windows 11  
**Required software:** Node.js 18 or newer  
**Server address:** `http://localhost:3000`  
**API host:** `api.cep.bpcl.in`
