const defCode = `
class A {

   var : Int <- 0;
   var2 : Int <- 0;
   value() : Int { var };

   set_var(num : Int) : SELF_TYPE {
      {
         var <- num;
         self;
      }
   };

   method1(num : Int) : SELF_TYPE{  -- same
      self
   };

   method2(num1 : Int, num2 : Int) : A {  -- plus
      (let x : Int in
	 {
            x <- num1 + num2;
	    (new A).set_var(x);
	 }
      )
   };

   method3(num : Int) : A {  -- negate
      (let x : Int in
	 {
            x <- ~num;
	    (new A).set_var(x);
	 }
      )
   };

   method4(num1 : Int, num2 : Int) : A {  -- diff
            if num2 < num1 then
               (let x : Int in
		  {
                     x <- num1 - num2;
	             (new A).set_var(x);
	          }
               )
            else
               (let y : Int in
		  {
	             y <- num2 - num1;
	             (new A).set_var(y);
		  }
               )
            fi
   };

   method5(num : Int) : A {  -- factorial
      (let x : Int <- 1 in
	 {
	    (let y : Int <- 1 in
	       while y <= num loop
	          {
                     x <- x * y;
	             y <- y + 1;
	          }
	       pool
	    );
	    (new A).set_var(x);
	 }
      )
   };

};

class B inherits A {  -- B is a number squared

   method5(numB : Int) : B { -- square
      (let x : Int in
	 {
            x <- numB * numB;
	    (new B).set_var(x);
	 }
      )
   };

};

class C inherits B {

   method6(num : Int) : A { -- negate
      (let x : Int in
         {
            x <- ~num;
	    (new A).set_var(x);
         }
      )
   };

   method5(num : Int) : B {  -- cube
      (let x : Int in
	 {
            x <- num * num * num;
	    (new B).set_var(x);
	 }
      )
   };

};

class D inherits B {  
		
   method7(num : Int) : Bool {  -- divisible by 3
      (let x : Int <- num in
            if x < 0 then method7(~x) else
            if 0 = x then true else
            if 1 = x then false else
	    if 2 = x then false else
	       method7(x - 3)
	    fi fi fi fi
      )
   };

};

class E inherits D {

   method6(num : Int) : A {  -- division
      (let x : Int in
         {
            x <- num / 8;
	    (new A).set_var(x);
         }
      )
   };

};

class F{

   method5(num : Int) : A {  -- division
      (let x : Int in
         {
            x <- num / 8;
	    (new A).set_var(x);
         }
      )
   };

};

class H inherits IO{

   method9(num : Int) : A {  -- division
      (let x : Int in
         {
            x <- num / 8;
	    (new A).set_var(x);
         }
      )
   };

};



class Main {
   
   char : String;
   avar : A; 
   a_var : A;
   flag : Bool <- true;
   input_line : String;
   iodevice : IO;


   is_even(num : Int) : Bool {
      (let x : Int <- num in
            if x < 0 then is_even(~x) else
            if 0 = x then true else
	    if 1 = x then false else
	          is_even(x - 2)
	    fi fi fi
      )
   };

   main() : Object {
      {
         avar <- (new A);
         iodevice <- (new H);
         avar.set_var(2);
         (iodevice).out_int(avar.value());

         input_line <- (new IO).in_string();
         
         if is_even(avar.value()) then
	          (new IO).out_string(" es par!\\n")
	     else
	          (new IO).out_string(" es impar!\\n")
	     fi;
	     
         a_var <- (new A).set_var(3);
	      avar <- (new B).method2(avar.value(), a_var.value());
         (iodevice).out_int(avar.value());
         (new IO).out_string("\\n");
         
         
         avar <- (new C).method6(avar.value());
         (iodevice).out_int(avar.value());
         (new IO).out_string("\\n");
        
         a_var <- (new A).set_var(5);
         avar <- (new D).method4(avar.value(), a_var.value());
         (iodevice).out_int(avar.value());
         (new IO).out_string("\\n");
        
         avar.set_var(5);
         avar <- (new C)@A.method5(avar.value());
         (iodevice).out_int(avar.value());
         (new IO).out_string("\\n");
      	 
         avar.set_var(6);
         avar <- (new C)@B.method5(avar.value());
         (iodevice).out_int(avar.value());
         (new IO).out_string("\\n");

         self;
      }
   };

};
`

export default defCode;