# System Instructions

## Description
This system is a platform for creating custom bags. Users can select bag models, materials, colors, and details, and preview their designs in 3D.

## Project Structure
- `/ui`: UI components from v0
- `/api`: Server/backend code for Render
- `/data`: Database and seed files
- `/logic`: Business logic
- `/assets`: Icons, images, 3D models
- `/tools`: Helper tools like the 2D to 3D zip package

## Rules
1. Perform tasks in order and update `build.status.json`.
2. After each task:
    - `git add . && git commit -m "<task>" && git push`
    - Update `"completed"`, `"current_task"`, and `"next_step"` in `build.status.json`
3. Add relevant notes and changes to `system_instructions.md`.
4. Report errors or uncertainties in logs.