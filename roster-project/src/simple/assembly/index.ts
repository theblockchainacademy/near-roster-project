import { storage, context, PersistentVector } from "near-sdk-as";
import { Course } from "./course";
 
export function welcomeUser(): string {
    return "Greetings " + context.sender + " .... :)"
}

let studentlist = new PersistentVector<string>('student');
let absentlist = new PersistentVector<string>('absent');
let roster = new PersistentVector<string>('list');
let courselist = new PersistentVector<Course>('courses');

@mutateState()
export function initial(): string{
	
        if(roster.length < 1 ){

            let slist = new Array<string>();
            let courseqty = new Array<Course>();
            let scount: i32 = 0;
            let strstuds: string = "";
            let course0 = new Course(101, "Java", true);
            let crs: string = "";
            courselist.push(course0);
            let courseamt: i32 = 0;

            slist[0] = "Rob Sims";
            scount++;
	    slist[1] = "Mike Dorgan";
            scount++;
	    slist[2] = "Tom Reager";
	    scount++;
	    slist[3] = "Mary Smith";
	    scount++;
	    slist[4] = "Ryan Williams";
            scount++;
	    slist[5] = "Bryant Nielson";
            scount++;
	    slist[6] = "Ryan Kraz";
            scount++;
            for(let j = 0; j < scount; j++){
	        studentlist.push(slist[j]);
		roster.push(slist[j]);
		const mystudent = slist[j];
		strstuds = strstuds + " " + j.toString() + ": " + mystudent + ", ";
            }
            courseamt = courselist.length;
	    strstuds = strstuds + "There is " + courseamt.toString() + " course.  The course is: " + course0.get_coursename();
	    return strstuds;
	 }else {

	    return "Students may be initialized.";
	}
}

export function markabsent(studentnum: i32): string {

	if(studentlist.containsIndex(studentnum)){
		let abstudent: string = "";
                abstudent = studentlist[studentnum]; 
		studentlist.swap_remove(studentnum);
		absentlist.push(abstudent);
		return "Student " + abstudent + " marked absent.";
	}
	return "ok";
} 

export function listabsent(): Array<string> {

	//assert(absentlist.length > 0, "No Students in the absent list!")
	let abstudlist = new Array<string>();
	let indx = new Array<i32>();
	let i: i32 = 0;

	while (i < absentlist.length){
		indx[i] = i;
		abstudlist.push(indx[i].toString() + " : " + absentlist[i]);
		i++;
	}
	return abstudlist;

} 

export function addStudent(student: string): string{
	
	let mystudent: string = "";
        mystudent = student;
	studentlist.push(mystudent);
        roster.push(mystudent);
        return "Student " + mystudent + " added. There are now " + studentlist.length.toString() + " students.";

}

export function removeStudent(rmstud: string): string{

	assert(studentlist.length > 0, "No Students in the list!");
	let ablist = new Array<string>();
	let studlist = new Array<string>();
	let rmstudent: string = "";
	let abstudent: string = "";
	let stud: string = "";
	let abindx = new Array<i32>();
	let absentidx: i32;
	let x: i32 = 0;
	let y: i32 = 0;
	
	while (y < studentlist.length){
		
		stud = studentlist[y];
		if(stud == rmstud){
			
			rmstudent = studentlist.swap_remove(y);
		}		
		y++;
	}

	while (x < absentlist.length){
		
                abstudent = absentlist[x];
                if(abstudent == rmstud){

                        rmstudent = absentlist.swap_remove(x);
                }
                x++;

	}
	return context.sender + " removed " + rmstudent;	
}

export function listStudents(): Array<string>{
	
	let studlist = new Array<string>();
	let indx = new Array<i32>();
	let i: i32 = 0;
	//
	while (i < studentlist.length){
		indx[i] = i;
		studlist.push(indx[i].toString() + " : " + studentlist[i]);
		i++; 
	}
	return studlist;
}

export function movePresent(abstudnum: i32): string {
	
	if(absentlist.containsIndex(abstudnum)){
	
		let abstudent: string = "";
                abstudent = absentlist[abstudnum];
		absentlist.swap_remove(abstudnum);
                studentlist.push(abstudent);
                return context.sender + " student " + abstudent + " moved from absent to present.";
	}else {
		return context.sender + " cannot find student with index " + abstudnum.toString() + ".";
	}

}

export function addCourse(id: i32, cnm: string, offered: boolean): string{

        let id0: i32 = 0;
	let cnm0: string = "";
	let offered0: boolean;
	let clist: string = "";

	id0 = id;
	cnm0 = cnm;
	offered0 = offered;

	let len: i32 = 0;
	len = courselist.length;
	let newcourse = new Course(id0, cnm0, offered0);
	courselist.push(newcourse);
	len = courselist.length;

	let addedcourse: string = "";
	let courseid: i32 = 0;
	let mycrs_name: string = "";
	let noffered: boolean;

	courseid = newcourse.get_coursenum();
	mycrs_name = newcourse.get_coursename();
	noffered = newcourse.get_offered();

	addedcourse = "Added course. ID: " + courseid.toString() + " Name: " + newcourse.get_coursename() + " Offered: " + noffered.toString();
        addedcourse = addedcourse + ". The course list length: " + len.toString();	
        
	return addedcourse;
}

@mutateState() 
export function listcourses(): string{

	let z: i32 = 0;
	let coursedata: string = "";
	let courselisting: string = "";
	let myid: i32 = 0;
	let mycname: string = "";
	let myoffered: boolean;
	let offeredstatus: string = "";
	let ilength: i32 = 0;

	while (z < courselist.length){
	
		const mycourse = courselist[z];
		myid = mycourse.get_coursenum();
		mycname = mycourse.get_coursename();
		myoffered = mycourse.get_offered();

		if(myoffered){
			offeredstatus = "currently offered";
		}else{
			offeredstatus = "not currently offered";
		}
		
		coursedata = coursedata + " " + myid.toString() + " " + mycname + " " + offeredstatus + ","; 
		z++;
	}
	
	coursedata = coursedata.trim();
	courselisting = z.toString() + " courses: " + coursedata;
	ilength = courselisting.length;
	courselisting = courselisting.substring(0,ilength - 1);
	return courselisting;

}

export function removecourse(rmcourse: i32): string{
	
	let k: i32 = 0;
	let mycnum: i32 = 0;
	let rmcrs: i32 = 0;
	let rmcoursemsg: string = "";

	rmcrs = rmcourse;

	while (k < courselist.length){

		const rcourse = courselist[k];
		mycnum = rcourse.get_coursenum();
		if(mycnum == rmcrs){

		rmcoursemsg = "Looking to rm course: " + mycnum.toString() + " and the_rmcrs is: " + rmcrs.toString() + " idx: " + k.toString();
			const removedcrs = courselist.swap_remove(k);
			rmcoursemsg = "Removed course: " + removedcrs.get_coursename();
		}

		k++;
	}

	return rmcoursemsg;

}

export function offercourse(crsnum: i32, offercrs: boolean): string {

	let a: i32 = 0;
	let cnum: i32 = crsnum;
	let mycrsnum: i32 = 0;
	let offercrsmsg: string = "";
	let crsname: string = "";

	while (a < courselist.length){

		const offcrs = courselist[a];
		mycrsnum = offcrs.get_coursenum();
		
		if(mycrsnum == cnum){
		
			if(offercrs){
				
				crsname = offcrs.get_coursename();
				offcrs.set_offered(true);
				courselist[a] = offcrs;
				offercrsmsg = "Looking to offer the course " + crsnum.toString() + ", " + crsname;
			}else{
				
				let stat: boolean;
				let offstat: boolean
				crsname = offcrs.get_coursename();
				stat = offcrs.set_notoffered();
				offstat = offcrs.get_offered();
				courselist[a] = offcrs;
				offercrsmsg = "Looking to NOT offer the course" + cnum.toString() + " " + crsname;
									
			}

		}

		a++;
	}
	
	return offercrsmsg;
}

export function modcoursename (crsnum: i32, crsname: string): string {

	let b: i32 = 0;
        let cnum: i32 = crsnum;
	let cname: string = crsname;
	let prevnm: string = "";
	let newnm: string = "";
        let mycrsnum: i32 = 0;
        let crsnamemsg: string = "";

	while (b < courselist.length){
	
		const crs = courselist[b];
                mycrsnum = crs.get_coursenum();

		if(mycrsnum == cnum){
		
			prevnm = crs.get_coursename();
			crs.set_coursename(cname);
			newnm = crs.get_coursename();
			courselist[b] = crs;
			crsnamemsg = "Course: " + cnum.toString() + " is: " + newnm + ", it was " + prevnm;
		
		}
	
		b++;
	}

	return crsnamemsg;
}

export function modcoursenum (crsnum: i32, newcnum: i32): string {

	let d: i32 = 0;
        let currnum: i32 = crsnum;
        let newnum: i32 = newcnum;
        let prevnum: i32 = 0;
        let mycrsnum: i32 = 0;
	let mycrsname: string = "";
        let crsnummsg: string = "";

        while (d < courselist.length){

		const crs = courselist[d];
                mycrsnum = crs.get_coursenum();
		
		if(mycrsnum == crsnum){

			prevnum = crs.get_coursenum();
			mycrsname = crs.get_coursename();
			crs.set_coursenum(newnum);
                        mycrsnum = crs.get_coursenum();
                        courselist[d] = crs;
                        crsnummsg = "Course: " + mycrsnum.toString() + ", " + mycrsname + ", was " + prevnum.toString();	
		
		}

		d++;
	}

	return crsnummsg;

}

export function write(key: string, value: string): string {
  storage.set(key, value);
  return `✅ Data sved. ( ${courseStorageReport()} )`;
}

function courseStorageReport(): string {
  return `storage [ ${context.storageUsage} bytes ]`
}
