# Axolotl Runner Game - Website Deployment Instructions

## Overview
Deploy the Axolotl Runner game to twopelicans.ai at a family-friendly URL without affecting the professional business site appearance.

## Deployment Strategy
- **URL Path**: `/family/axolotl-runner`
- **Visibility**: Not linked in main navigation
- **Access**: Direct link only (share with family)
- **Integration**: Standalone page, maintains business site professionalism

## Source Files Location
The built game files are located at:
```
/Users/raykhatir/code/game-axolotl-runner/dist/
```

## Files to Deploy
Copy these files from the game project to the website:
```
dist/
├── index.html          (1.5 KB)
└── assets/
    └── main-*.js       (1.5 MB - exact filename has hash)
```

## Step-by-Step Implementation

### 1. Create Directory Structure
Create the following directory in the website project:
```bash
mkdir -p public/family/axolotl-runner
mkdir -p public/family/axolotl-runner/assets
```

### 2. Copy Game Files
Copy the game files to the website directory:
```bash
# Copy the HTML file
cp /Users/raykhatir/code/game-axolotl-runner/dist/index.html \
   ./public/family/axolotl-runner/index.html

# Copy the assets folder
cp -r /Users/raykhatir/code/game-axolotl-runner/dist/assets/* \
   ./public/family/axolotl-runner/assets/
```

### 3. Create a Landing Page (Optional but Recommended)
Create a simple landing page at `/family/index.html` for family games:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TwoPelicans Family Games</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .container {
            text-align: center;
            max-width: 600px;
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 0.5em;
        }
        .game-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin: 20px 0;
            transition: transform 0.3s;
        }
        .game-card:hover {
            transform: scale(1.05);
        }
        .play-button {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.2em;
            font-weight: bold;
            margin-top: 20px;
            transition: background 0.3s;
        }
        .play-button:hover {
            background: #45a049;
        }
        .description {
            margin: 15px 0;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 Family Game Zone</h1>
        <div class="game-card">
            <h2>🌊 Axolotl Runner</h2>
            <p class="description">
                Help our cute axolotl swim through the underwater world!
                Collect pearls and worms while avoiding obstacles.
                Perfect for ages 5-9.
            </p>
            <p>📱 Works on tablets and computers!</p>
            <a href="/family/axolotl-runner" class="play-button">Play Now!</a>
        </div>
    </div>
</body>
</html>
```

### 4. Update Website Routing (if using a framework)

#### For Next.js/React:
No action needed if files are in `public/` directory - they'll be served automatically.

#### For Express/Node.js:
Ensure static file serving includes the family directory:
```javascript
app.use(express.static('public'));
```

#### For Nginx:
Add location block if needed:
```nginx
location /family/ {
    root /var/www/twopelicans/public;
    try_files $uri $uri/ /family/index.html;
}
```

### 5. Optional: Add Basic Password Protection
If you want to add simple protection, create a wrapper page:
```html
<!-- Save as public/family/axolotl-runner/protected.html -->
<script>
const password = prompt("Enter the family password:");
if (password === "pelican2024") {  // Change this password
    window.location.href = "/family/axolotl-runner/index.html";
} else {
    alert("Sorry, that's not the right password!");
    window.location.href = "/";
}
</script>
```

### 6. Test Deployment
After deploying, test these URLs:
- `https://twopelicans.ai/family/` - Family games landing (if created)
- `https://twopelicans.ai/family/axolotl-runner/` - Direct game link

### 7. Share with Family
Send this link to family members:
```
Hey kids! 🎮 Check out the new game I made for you:
https://twopelicans.ai/family/axolotl-runner/

It works on your iPad - just tap to make the axolotl swim!
```

## Important Notes
- **No Navigation Changes**: Do NOT add links to the main business navigation
- **Keep URLs Private**: Share links directly with family only
- **Browser Support**: Game works on all modern browsers including Safari on iPad
- **Progress Saves**: Each device saves its own progress locally
- **No Backend Required**: Game is completely client-side

## Verification Checklist
- [x] Files copied to `/family/axolotl-runner/` directory
- [x] Game loads at `/family/axolotl-runner/`
- [x] Touch controls work on iPad
- [x] No links added to main business navigation
- [x] Business site remains unchanged
- [x] Game progress saves between sessions

## Deployment Status
✅ **COMPLETE** - Game successfully deployed to production on 2025-09-20

## Rollback Plan
If needed, simply delete the `/family/` directory to remove the game completely without affecting the business site.

## Future Enhancements
- Add more family games to `/family/` directory
- Create a family games portal page
- Add high score leaderboard (requires backend)
- Custom domain like `games.twopelicans.ai`

---
*Created: 2025-09-20*
*Game Version: v1.0.0-alpha*
*Deployment Method: Static file hosting*