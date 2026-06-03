# Resource Aggregator (Resource Centralization App)

A web application designed for academic resource centralization, gamified syllabus checklist tracking, and student collaboration. It integrates a **Next.js** frontend with a **Spring Boot** backend, using a **Supabase (PostgreSQL)** database and **Google Drive API** for secure cloud storage of academic resources (syllabus files, slides, notes, audio, video, links, etc.).

---

## System Architecture

- **Frontend**: Next.js (TypeScript, Tailwind CSS) — Runs on [http://localhost:3000](http://localhost:3000)
- **Backend**: Spring Boot (Java 17+, Maven) — Runs on [http://localhost:8080](http://localhost:8080) with prefix `/api/v1`
- **Database**: Supabase / PostgreSQL (Schema provided in [schema.sql](file:///Users/muhimen/Development/resource_aggregator/schema.sql))
- **Cloud Integration**: Google Drive (for user-level OAuth cloud storage syncing)

---

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [Java Development Kit (JDK)](https://adoptium.net/) (v17 or later)
- [Maven](https://maven.apache.org/) (optional, since `./mvnw` is included in the project)
- A running [PostgreSQL / Supabase](https://supabase.com/) instance

---

## Setup Instructions

### 1. Database Setup
1. Create a database instance on Supabase or locally on PostgreSQL.
2. Execute the DDL statements in the root `schema.sql` file to create the tables, indices, triggers, and utility functions.
   > [!NOTE]
   > The schema references `auth.users(id)` from Supabase Auth. If hosting the DB independently, ensure your custom authentication schema maps correctly to the foreign key constraint.

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Duplicate the template properties file:
   ```bash
   cp backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
   ```
3. Open the newly created application.properties and populate the values:
   - **PostgreSQL Connection URL, Username, and Password**
   - **Supabase URL and Key**
4. Configure your Google OAuth credentials in `backend/src/main/resources/application.yml` (copied/created from `application-example.yml`):
   ```yaml
   google:
     client-id: "YOUR_GOOGLE_CLIENT_ID"
     client-secret: "YOUR_GOOGLE_CLIENT_SECRET"
     redirect-uri: "http://localhost:8080/api/v1/oauth/callback/google"
   ```
5. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Access the web application at [http://localhost:3000](http://localhost:3000).

---

## Google Cloud Console Setup for Google Drive

To enable the Google Drive integration, you must configure a project on Google Cloud Console:

### Step 1: Create a Google Cloud Project
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown in the top-left and select **New Project**.
3. Name your project (e.g., `Resource Aggregator`) and click **Create**.

### Step 2: Enable the Google Drive API
1. Navigate to the **API Library** (APIs & Services > Library).
2. Search for **Google Drive API**.
3. Click on the API and select **Enable**.

### Step 3: Configure the OAuth Consent Screen
1. Go to **APIs & Services** > **OAuth consent screen**.
2. Select **External** User Type (if you want any Gmail user to be able to log in) and click **Create**.
3. Fill in the required fields:
   - **App name**: e.g., `Resource Aggregator`
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Under **Scopes**, click **Add or Remove Scopes**.
   - Manually enter or search for the Google Drive scope: `https://www.googleapis.com/auth/drive`
   - Check the box to add it, then click **Update** and **Save and Continue**.
5. Under **Test users**, click **Add Users** and add any Google accounts (like your own) that you plan to test the login integration with (since the app remains in "Testing" status).

### Step 4: Create OAuth 2.0 Credentials
1. Navigate to **APIs & Services** > **Credentials**.
2. Click **Create Credentials** and select **OAuth client ID**.
3. Set the **Application type** to **Web application**.
4. In the configuration settings:
   - **Authorized JavaScript origins**: `http://localhost:3000` (and `http://localhost:8080` if needed)
   - **Authorized redirect URIs**: `http://localhost:8080/api/v1/oauth/callback/google`
5. Click **Create**. A modal will display your **Client ID** and **Client Secret**.
6. Copy these keys into your backend configuration (`application.yml` or `application.properties`).
