#!/bin/bash

# EGO Custom Bags - Task Completion Script
# This script automates the process of committing and pushing changes after completing a task

# Display script header
echo "=========================================="
echo "EGO Custom Bags - Task Completion Script"
echo "=========================================="

# Check if a task description was provided
if [ $# -eq 0 ]; then
    echo "Error: No task description provided."
    echo "Usage: ./task-completion.sh \"Description of completed task\""
    exit 1
fi

# Store the task description
TASK_DESCRIPTION="$1"

# Get the current date and time
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Check for uncommitted changes
if [[ -z $(git status -s) ]]; then
    echo "No changes to commit. Make some changes first."
    exit 1
fi

# Display the changes that will be committed
echo "The following changes will be committed:"
git status -s

# Confirm with the user
read -p "Do you want to proceed with committing these changes? (y/n): " CONFIRM
if [[ $CONFIRM != "y" && $CONFIRM != "Y" ]]; then
    echo "Operation cancelled."
    exit 0
fi

# Add all changes to staging
echo "Adding changes to staging..."
git add .

# Create commit message with task description and timestamp
COMMIT_MESSAGE="Task completed: $TASK_DESCRIPTION [$TIMESTAMP]"
echo "Creating commit with message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE"

# Check if commit was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to commit changes."
    exit 1
fi

# Push changes to remote repository
echo "Pushing changes to remote repository..."
git push

# Check if push was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to push changes to remote repository."
    echo "You may need to pull changes from the remote repository first."
    echo "Try running: git pull"
    exit 1
fi

# Display success message
echo "=========================================="
echo "Task completed and changes pushed successfully!"
echo "Task: $TASK_DESCRIPTION"
echo "Time: $TIMESTAMP"
echo "=========================================="

# Update development status document with completed task
DEV_STATUS_FILE="../docs/development-status.md"
if [ -f "$DEV_STATUS_FILE" ]; then
    echo "Updating development status document..."
    
    # Check if there's a "Recent Completed Tasks" section, if not, create one
    if ! grep -q "## Recent Completed Tasks" "$DEV_STATUS_FILE"; then
        # Find the Version History section and insert before it
        if grep -q "## Version History" "$DEV_STATUS_FILE"; then
            sed -i '/## Version History/i \
## Recent Completed Tasks\
\
- ✅ '"$TASK_DESCRIPTION"' ('"$TIMESTAMP"')\
\
' "$DEV_STATUS_FILE"
        else
            # If no Version History section, append to the end of the file
            echo -e "\n## Recent Completed Tasks\n\n- ✅ $TASK_DESCRIPTION ($TIMESTAMP)\n" >> "$DEV_STATUS_FILE"
        fi
    else
        # Add the new task to the existing Recent Completed Tasks section
        sed -i '/## Recent Completed Tasks/a \
- ✅ '"$TASK_DESCRIPTION"' ('"$TIMESTAMP"')' "$DEV_STATUS_FILE"
    fi
    
    echo "Development status document updated."
fi

exit 0
