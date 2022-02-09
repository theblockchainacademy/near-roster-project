@nearBindgen
export class Course {

        private coursenum: i32
        private cname: string;
        private offered: boolean;

        constructor (coursenum: i32, cname: string, offered: boolean) {
            
            this.cname = cname;
            this.coursenum = coursenum;
            this.offered = offered;

        }

        set_coursenum(coursenum: i32): void {
            this.coursenum = coursenum;
        }

        set_coursename(cname: string): void {

            this.cname = cname;
        }

        set_offered(coffer: boolean): void {
            this.offered = true;
        }

        set_notoffered(): boolean {
            this.offered = false;
	    return this.offered;
        }

        get_coursenum(): i32 {
            return this.coursenum;
        }

        get_coursename(): string {
            return  this.cname;
        }

        get_offered(): boolean {
            return this.offered;
        }

}
