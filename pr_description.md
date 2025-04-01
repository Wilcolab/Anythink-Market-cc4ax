## Changes

- Fixed the invert filter implementation by replacing manual pixel manipulation with PIL's ImageOps.invert()
- Updated project dependencies to latest stable versions

### Technical Details
- Replaced incorrect color inversion formula (25 - value) with proper PIL implementation (255 - value)
- Added ImageOps to PIL imports
- Improved performance by using built-in C-level implementation instead of Python loops
- Updated all dependencies to their latest stable versions for security and features

### Testing
The invert filter now correctly:
- Inverts white to black and vice versa
- Properly handles all RGB color channels
- Processes images faster due to optimized implementation

### Dependencies Updated
- fastapi: 0.104.1 → 0.109.2
- uvicorn: 0.23.2 → 0.27.1
- python-multipart: 0.0.6 → 0.0.9
- jinja2: 3.1.2 → 3.1.3
- pillow: 10.1.0 → 11.1.0
- python-dotenv: 1.0.0 → 1.0.1
