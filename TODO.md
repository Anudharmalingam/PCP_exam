# TODO: Make Token Visible in Shareable Link

## Steps:
- [x] Step 1: Update src/context/FoodDelivery.jsx to store token and dataUrl in context state
- [x] Step 2: Update src/App.jsx to display a shareable link with token as query param and add copy button
- [x] Step 3: Test in browser and verify token is visible/copiable (Vite server running at http://localhost:5173/)
- [x] Step 4: Update TODO with completion status

## Result:
Token and dataset URL are now visible in a prominent green box in the App with a clickable link and copy button. The shareable link format is `http://localhost:5173/?token=...&dataset=...` containing the token directly in the query params.
