# Dobytes CMS (DCMS)

DCMS is a modular Content Management System built with:

- **Backend**: Express.js (`DCMSAPI`)
- **Frontend**: React + Vite (`DCMSWEB`)
- **Database**: MariaDB (`DCMSDB`)
- **Auth**: JWT-based authentication
- **Access Control**: Role-based menu visibility

---

## 📦 Project Structure

```
/dcms
├── DCMSAPI      # Backend (Express.js)
├── DCMSWEB      # Frontend (React)
└── README.md
```

---

## ⚙️ Installation

### 🧩 Requirements

- Node.js 18+
- MariaDB 10.5+
- Git

### 🚀 Setup Steps

#### 1. Clone the project

```bash
git clone https://github.com/triyuliantoo/dcms.git
cd dcms
```

#### 2. Backend Setup (`DCMSAPI`)

```bash
cd DCMSAPI
npm install
cp .env.example .env   # then configure DB credentials
npm start
```

#### 3. Frontend Setup (`DCMSWEB`)

```bash
cd ../DCMSWEB
npm install
npm run dev
```

#### 4. Create Database

Login to your MariaDB instance and run the following SQL:

```sql
CREATE DATABASE DCMSDB;
USE DCMSDB;

-- Tables
CREATE TABLE Tbl_Role (
  RoleID INT AUTO_INCREMENT PRIMARY KEY,
  RoleName VARCHAR(100) NOT NULL UNIQUE,
  Description TEXT
);

CREATE TABLE Tbl_Menu (
  MenuID INT AUTO_INCREMENT PRIMARY KEY,
  MenuName VARCHAR(100) NOT NULL,
  Path VARCHAR(100),
  Icon VARCHAR(50),
  ParentID INT,
  IsActive TINYINT(1) DEFAULT 1,
  SortOrder INT
);

CREATE TABLE Tbl_User (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(100) NOT NULL UNIQUE,
  PasswordHash VARCHAR(255) NOT NULL,
  FullName VARCHAR(255),
  Email VARCHAR(100),
  RoleID INT,
  IsActive TINYINT(1) DEFAULT 1,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tbl_RoleMenu (
  RoleID INT,
  MenuID INT,
  PRIMARY KEY (RoleID, MenuID),
  FOREIGN KEY (RoleID) REFERENCES Tbl_Role(RoleID),
  FOREIGN KEY (MenuID) REFERENCES Tbl_Menu(MenuID)
);
```

#### 5. Insert Sample Data

```sql
-- Roles
TRUNCATE Tbl_Role;
INSERT INTO Tbl_Role (RoleID, RoleName, Description) VALUES
(1, 'Administrator', 'System administrator with full access'),
(2, 'HR Officer', 'HR department access to absensi and payroll');

-- Menus
TRUNCATE Tbl_Menu;
INSERT INTO Tbl_Menu (MenuID, MenuName, Path, Icon, ParentID, IsActive, SortOrder) VALUES
(1, 'Dashboard', '/dashboard', 'dashboard', NULL, 1, 1),
(2, 'Absensi', '/absensi', 'calendar', NULL, 1, 2),
(3, 'Payroll', '/payroll', 'money', NULL, 1, 3);

-- Update existing users' roles (skip if already created)
UPDATE Tbl_User SET RoleID = 1 WHERE Username = 'administrator';
UPDATE Tbl_User SET RoleID = 2 WHERE Username = 'hrd';

-- Role-Menu Mapping
TRUNCATE Tbl_RoleMenu;
INSERT INTO Tbl_RoleMenu (RoleID, MenuID)
SELECT 1, MenuID FROM Tbl_Menu; -- admin full access

INSERT INTO Tbl_RoleMenu (RoleID, MenuID)
SELECT 2, MenuID FROM Tbl_Menu WHERE MenuName IN ('Dashboard', 'Absensi', 'Payroll');
```

---

## 🔐 Sample Users

| Username      | Password  | Role          |
|---------------|-----------|---------------|
| administrator | P@ssw0rd  | Administrator |
| hrd           | P@ssw0rd  | HR Officer    |

Passwords are hashed using bcrypt before being stored.

---

## 📄 License & Credits

© 2025 [Tri Yulianto](https://github.com/triyuliantoo/)  
This project is open source under the MIT License.
