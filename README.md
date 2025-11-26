📱 ✨ EXPENSE TRACKER – ANDROID APP (KOTLIN)

A modern Android application built using Kotlin, ViewBinding, Retrofit, and Material UI.
This app communicates with a secure Node.js backend using protected JWT authentication with automatic token refresh.

⭐ Features
🔐 Authentication

User Login

User Registration

JWT Access Token

Auto Refresh Token (TokenAuthenticator + AuthInterceptor)

Logout (clears user session)

💰 Expense Management

Add Expense

View All Expenses

Edit Expense

Delete Expense

RecyclerView with Instant UI Updates

🎨 Modern UI / UX

Gradient backgrounds

Material Design UI

ViewBinding

Smooth Dialog UI for editing expenses

🛠️ Tech Stack

Languages & Libraries

Kotlin

Android ViewBinding

Retrofit + OkHttp

Token Authenticator

RecyclerView

Material Components

Architecture

MVVM-lite (Managers + Models + Activities)

📁 Project Structure (Highlighted)
app/
├── src/main/java/com.example.expenseinternshipapp/
│   ├── Activity/              ← Login, Register, Main
│   ├── Adapter/               ← ExpenseAdapter
│   ├── ApiManagers/           ← Retrofit API handler
│   ├── AuthInterceptor/       ← Token refresh & authentication
│   ├── DataModel/             ← All request/response models
│   └── URLs/                  ← RetrofitInstance (Base URL)
│
├── res/                       ← XML layouts, drawables, UI
└── build.gradle.kts

🔗 API Base URL

Set inside RetrofitInstance.kt:

const val BASE_URL = "http://10.0.2.2:3000/api/v1/"


(Only for emulator – maps to your local backend)

▶️ How to Run the Android App

Clone the repository

Open the app/ folder in Android Studio

Add inside AndroidManifest.xml:

android:usesCleartextTraffic="true"


Run your backend first

Then run Android app on emulator or device

🧪 Important Notes

Access token refresh is fully automatic

Tokens stored using SharedPreferences

Logout clears access & refresh tokens

📦 Generate Release APK

Go to:

Build → Generate Signed Bundle / APK → APK → release


APK location:

app/release/app-release.apk

📝 What I Learned

API Integration with Retrofit

Handling JWT Authentication

Token Refresh Flow

Professional Android Project Structure

Building Attractive UI with Material + ViewBinding
