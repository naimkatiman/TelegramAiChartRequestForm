# Telegram AI Chart Request Form

A modern web application for customizing Telegram trading bot settings with real-time chart analysis capabilities.

## Overview

This application provides a user-friendly interface for configuring trading bot parameters, including:
- Equity indices selection
- Forex pairs configuration
- Commodities tracking
- Custom indicators setup
- Access level management

## Tech Stack

- **Frontend:**
  - React with TypeScript
  - TailwindCSS for styling
  - Framer Motion for animations
  - Shadcn UI components
  - React Hook Form for form management
  - Zod for form validation

- **Backend:**
  - Express.js
  - PostgreSQL with Drizzle ORM
  - WebSocket for real-time updates

## Process Flow

```mermaid
graph TD
    A[User Access Form] --> B[Fill Form Details]
    B --> C{Select Trading Instruments}
    C --> D[Equity Indices]
    C --> E[Forex Pairs]
    C --> F[Commodities]
    D --> G[Configure Custom Indicators]
    E --> G
    F --> G
    G --> H[Set Access Level]
    H --> I[Submit Request]
    I --> J{Validation}
    J -- Success --> K[Store in Database]
    K --> L[Send to Telegram Bot]
    J -- Error --> M[Show Error Message]
    M --> B
```

## Features

1. **Instrument Selection**
   - Multiple equity indices (DJIA, NASDAQ, S&P 500, etc.)
   - Major forex pairs
   - Popular commodities
   - Custom instrument addition

2. **Indicator Configuration**
   - Default indicators per instrument type
   - Custom indicator support
   - Technical analysis settings

3. **Access Management**
   - Robo Client access
   - Custom access types
   - Telegram integration

4. **Real-time Updates**
   - Submission status tracking
   - Request history
   - Error handling

## Setup Instructions

1. **Prerequisites**
   ```bash
   # Required software
   - Node.js (v18 or higher)
   - PostgreSQL (v14 or higher)
   ```

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd TelegramAiChartRequestForm

   # Install dependencies
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file with the following variables
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   ```

4. **Database Setup**
   ```bash
   # Run database migrations
   npm run db:push
   ```

5. **Development**
   ```bash
   # Start development server
   npm run dev
   ```

6. **Production**
   ```bash
   # Build for production
   npm run build

   # Start production server
   npm start
   ```

## API Endpoints

### Bot Customization
- `POST /api/submissions` - Create new bot customization request
- `GET /api/submissions` - Get submission history
- `GET /api/submissions/:id` - Get specific submission details

### Status Updates
- `GET /api/status/:submissionId` - Get submission status
- `WS /ws/status` - WebSocket endpoint for real-time status updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support


## License

This project is licensed under the MIT License - see the LICENSE file for details. 