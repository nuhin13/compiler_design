const fs = require('fs');

let lexer = (sourceCode) => {
    return sourceCode.split('\n').map(line => {
        return line.split(' ').map(token => {
            if (token === 'sat') {
                return { type: 'assignment' };
            } else if (token === 'jug') {
                return { type: 'operator', value: '+' };
            }else if(token === 'biyok'){
                return { type: 'operator', value: '-' };
            }else if(token === 'bhagshesh'){
                return { type: 'operator', value: '%' };
            } else if (token === 'shera') {
                return { type: 'print' };
            } else if (token === 'to' || token === 'sathe') {
                return { type: 'to' };
            } else if (token === 'jodi') {
                return { type: 'condition', value: token };
            }else if (isNaN(token)) {
                return { type: 'variable', value: token };
            } else if (!isNaN(token)) {
                return { type: 'value', value: parseInt(token) };
            }

                // unknown token
        });
    });
}
function parser(tokens) {
    return {
        type: 'Program',
        statements: tokens.map(line => {
            if (line[0].type === 'assignment') {
                return { type: 'assignment', lhs: line[1].value, rhs: line[3].value };
            } else if (line[0].type === 'operator') {
                if(line[0].value ==='+'){
                    return { type: 'operator', value: '+', lhs: line[1].value, rhs: line[3].value };
                }else if(line[0].value ==='-'){
                    return { type: 'operator', value: '-', lhs: line[1].value, rhs: line[3].value };
                }
                else if(line[0].value ==='%'){
                    return { type: 'operator', value: '%', lhs: line[1].value, rhs: line[3].value };
                }

            }else if (line[0].type === 'condition') {
                return { type: 'condition', value: 'if', lhs: line[1].value, rhs: line[3].value };
            }else if (line[0].type === 'print') {
                return { type: 'print', lhs: line[1].value };
            }
        }),
    };
}

/*

@.str = private unnamed_addr constant [4 x i8] c"%d\0A\00"

define i32 @main() {
  %a = alloca i32
  store i32 5, i32* %a
  %t0 = load i32, i32* %a
  %t1 = add i32 %t0, 3
  store i32 %t1, i32* %a  
  %r12 = load i32, i32* %a
  call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str, i64 0, i64 0), i32 %r12)
  ret i32 0
}

declare i32 @printf(i8*, ...)

*/

function generator(ast) {
    let targetCode = `@.str = private unnamed_addr constant [4 x i8] c"%d\\0A\\00"\n`;
    targetCode += `define i32 @main() {\n`;

    let tempCounter = 0;
    let assignment = 0;
    let variable =`t${tempCounter}`;
    let variable2 =`t${tempCounter++}`;
    ast.statements.forEach(statement => {
        if (statement.type === 'assignment') {
            if(assignment > 0){
                targetCode += `%${statement.lhs} = alloca i32\n`;
                targetCode += `store i32 ${variable2}, i32* %${statement.lhs}\n`;
            }else {
                targetCode += `%${statement.lhs} = alloca i32\n`;
                targetCode += `store i32 ${statement.rhs}, i32* %${statement.lhs}\n`;
            }
            assignment++;
        } else if (statement.type === 'operator') {
            variable = `%t${tempCounter++}`;
            variable2 = `%t${tempCounter++}`;
            targetCode += `${variable} = load i32, i32* %${statement.lhs}\n`;
            if(statement.value ==='+'){
                targetCode += `${variable2} = add i32 ${variable}, ${statement.rhs}\n`;
            }else if(statement.value ==='-'){
                targetCode += `${variable2} = sub i32 ${variable}, ${statement.rhs}\n`;
            }
            else if(statement.value ==='%'){
                targetCode += `${variable2} = srem i32 ${variable}, ${statement.rhs}\n`;
            }
            targetCode += `store i32 ${variable2}, i32* %${statement.lhs}\n`;
        } else if (statement.type === 'print') {
            let r1 = `%t${tempCounter++}`;
            targetCode += `${r1} = load i32, i32* %${statement.lhs}\n`;
            targetCode += `call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str, i64 0, i64 0), i32 ${r1})\n`;
        }
    });

    targetCode += `ret i32 0\n`;
    targetCode += `}\n`;
    targetCode += `declare i32 @printf(i8*, ...)\n`;

    return targetCode;
}

function build(targetCode) {
    fs.writeFileSync('./test.ll', targetCode);
    let exec = require('child_process').exec;
    exec('clang -S test.ll', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else {
            console.log(stdout);
        }
    });
    exec('clang test.ll -o test.o', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else {
            console.log(stdout);
        }
    });
}

function main() {
    let sourceCode = fs.readFileSync('test.boss', 'utf8');
    let tokens = lexer(sourceCode);
    console.log(tokens);
    console.log("============================\n\n");
    let ast = parser(tokens);
    console.log(ast);
    let targetCode = generator(ast);
    console.log(targetCode);

    build(targetCode);
}

main();
