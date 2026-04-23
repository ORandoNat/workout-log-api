# Parking Lot

## Ideas / Improvements
- Improve error message styling and centralize display logic
- Add loading state for fetch calls
- Identify and remove any remaining duplication in script.js
- Begin grouping related logic (API, DOM helpers, event wiring)
- Build a testing suite to test the app
- Once labels are added, make the stats section show the field label on top and the value below it instead of side by side.
- Add user accounts and login capability
- Add the ability to track calories burned based on what workout was done
- Allow user to enter their weight to automatically calculate BMI and avg calorie burn needed to cut/maintain/bulk

## Questions to Revisit
- Should I break script.js into modules later?
- Should I rename script.js to app.js once structure grows?
- Should DOM helpers and API helpers live in separate folders?

## Future Refactors
- Separate API calls into api.js
- Separate DOM helpers into dom.js
- Create a reusable formatDate() helper
- Consider extracting search/filter logic into its own function

## Nice-to-Haves
- Add dark mode toggle
- Add workout categories or tags
- Expand search/filter functionality
- Add animations for adding/removing workouts
- Improve mobile layout and spacing
- Edit Notes form should have it's own "pop-up" instead of being inserted into the addWorkout form.