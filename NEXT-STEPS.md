# Next Steps

## What I Completed Last Session
- Implemented auto-sort by date in loadWorkouts using Array.sort() with a comparator
- Sorted on the raw fetch result so filtering and rendering inherit the order automatically
- Verified sort, search, edit, delete, and add all work correctly after the change
- Identified two debug console.log statements in editWorkout to clean before next commit

## What's Next
- Extract date formatting into a helper function (two locations in codebase — find both first)
- Remove remaining debug console.log statements from editWorkout
- Commit everything since Day 17 once the date helper is in place
- Continue working through the HTML/CSS observations from this session (class naming, inline styles, br tag, form element audit)
- Begin organizing script.js into logical sections (API, DOM helpers, event wiring)
- Identify any remaining duplication and mark candidates for refactoring
- Add a loading state while fetching workouts

## Tiny Starter Action for Tomorrow
Open script.js and find both places where date formatting happens before writing anything.

## One Meaningful Improvement for Tomorrow
Extract date formatting into its own helper function and replace both usages.