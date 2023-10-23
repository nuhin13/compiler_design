@.str = private unnamed_addr constant [4 x i8] c"%d\0A\00"
define i32 @main() {
%a = alloca i32
store i32 10, i32* %a
%t1 = load i32, i32* %a
%t2 = srem i32 %t1, 2
store i32 %t2, i32* %a
%t3 = load i32, i32* %a
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str, i64 0, i64 0), i32 %t3)
ret i32 0
}
declare i32 @printf(i8*, ...)
