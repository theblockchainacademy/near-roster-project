#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Manage the students registed for this course."
echo
echo ---------------------------------------------------------
echo

near call $CONTRACT welcomeUser --account_id $OWNER
echo

echo
echo "intializing the application."
echo

near call $CONTRACT initial --account_id $OWNER

echo
echo "List the students and current courses"
near call $CONTRACT listStudents --account_id $OWNER
echo

echo
echo "Mark student with list index 1 absemt"
near call $CONTRACT markabsent '{"studentnum":1}' --account_id $OWNER
echo

echo
echo "List the absent students."
near call $CONTRACT listabsent --account_id $OWNER
echo

echo
echo "List the students who are present"
near call $CONTRACT listStudents --account_id $OWNER
echo

echo
echo "Add a new student to the roster"
near call $CONTRACT addStudent '{"student":"Jay Peterson"}' --account_id $OWNER
echo

echo
echo "Move the student on the absent list to the present list."
near call $CONTRACT movePresent '{"abstudnum":0}' --account_id $OWNER
echo

echo
echo "Remove a student from all lists."
near call $CONTRACT removeStudent '{"rmstud":"Bryant Nielson"}' --account_id $OWNER

echo
echo "List the students who are present"
near call $CONTRACT listStudents --account_id $OWNER
echo

echo
echo -------------------------------------------------------------
echo

echo "List the current courses."
near call $CONTRACT listcourses --account_id $OWNER
echo

echo
echo "Add three courses. Two course are currently offered, one course is not offered."
near call $CONTRACT addCourse '{"id":102, "cnm":"Python", "offered":true}' --account_id $OWNER
near call $CONTRACT addCourse '{"id":103, "cnm":"JavaScript", "offered":true}' --account_id $OWNER
near call $CONTRACT addCourse '{"id":104, "cnm":"Shell Scripting", "offered":false}' --account_id $OWNER
echo

echo
echo "List courses."
near call $CONTRACT listcourses --account_id $OWNER
echo

echo
echo "Offer a course that was not currently offered."
near call $CONTRACT offercourse '{"crsnum": 104, "offercrs": true}' --account_id $OWNER
echo

echo
echo "List courses."
near call $CONTRACT listcourses --account_id $OWNER
echo

echo
echo "Modify a course name."
near call $CONTRACT modcoursename '{"crsnum": 101, "crsname": "Java Programming"}' --account_id $OWNER
echo

echo
echo "List courses."
near call $CONTRACT listcourses --account_id $OWNER
echo

echo
echo "Modify a course number."
near call $CONTRACT modcoursenum '{"crsnum": 101, "newcnum": 1011}' --account_id $OWNER
echo

echo
echo "List courses."
near call $CONTRACT listcourses --account_id $OWNER
echo

echo
echo "Remove a course."
near call $CONTRACT removecourse '{"rmcourse": 103}' --account_id $OWNER
echo

echo
echo "List courses."
near call $CONTRACT listcourses --account_id $OWNER
echo

echo
echo "Return storage information"
near call $CONTRACT write '{"key": "Class Day", "value":"Yes"}' --accountId $CONTRACT
