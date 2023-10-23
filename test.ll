@.str = private unnamed_addr constant [4 x i8] c"%d\0A\00"
define i32 @main() {
%a = alloca i32
store i32 80, i32* %a
%t1 = load i32, i32* %a
%t2 = sub i32 %t1, 30
store i32 %t2, i32* %a
%t3 = load i32, i32* %a
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str, i64 0, i64 0), i32 %t3)
%b = alloca i32
store i32 %t2, i32* %b
%t4 = load i32, i32* %b
%t5 = sub i32 %t4, 10
store i32 %t5, i32* %b
%t6 = load i32, i32* %b
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str, i64 0, i64 0), i32 %t6)
%c = alloca i32
store i32 %t5, i32* %c
%t7 = load i32, i32* %c
%t8 = add i32 %t7, 20
store i32 %t8, i32* %c
%t9 = load i32, i32* %c
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str, i64 0, i64 0), i32 %t9)
ret i32 0
}
declare i32 @printf(i8*, ...)
