# My-Assembly-Language-Converter
I created this for my Computer Internals elective.

# Assembly Language:
My combined memory is composed of 3 16-bit registers and 1 16-bit RAM unit. One register holds the address for the RAM unit, and the other two (call them A and B) are for calculations. I created the following assembly language for my control unit.

The first two digits determine whether the command is a data instruction or an ALU command:

00 - ALU Instruction
01 - Data instruction for Address
10 - Data instruction for RAM
11 - Data instruction for A

### Data Instructions:

If the command is a data instruction, the next 14 digits in binary will be stored in the desired register, which means the instruction can hold a value up to 16,383. If necessary, this value can be manipulated using ALU instructions to reach its capacity of 16 digits. Here is an example of a few data instructions:


0b 01 10110101010010 — Address = 00101101010100102 (1160210)

0b 10 00111011010101 — RAM (at address 11602) = 00001110110101012 (379710)

0b 11 01010101010101 — A = 00010101010101012 (546110)


### ALU Instructions:

After the first two digits of the instruction, the next four digits determine the destinations of the calculation.

Digit 3 High - Stores result of calculation in A
Digit 4 High - Stores result of calculation in B
Digit 5 High - Stores result of calculation in Address
Digit 6 High - Stores result of calculation in RAM

Thus, the result of the operation can be stored in all registers simultaneously or no registers at all. 


The next three digits (7,8,9) determine the ALU operation.


000 - Operand 1 + Operand 2
001 - Operand 1 - Operand 2
010 - Operand 1 < Operand 2
011 - Operand 1 = Operand 2 (not bitwise)
100 - NOT Operand 1
101 - Operand 1 AND Operand 2
110 - Operand 1 OR Operand 2
111 - Operand 1

The next two pairs of digits determine the two operands of the equation. Each combination of digits corresponds to a different register (Digits 10,11 correspond to Operand 1; 12, 13 correspond to Operand 2).

00 - Register A
01 - Register B
10 - Address
11 - RAM

Finally, the last three digits of the instruction determine the jump, which will jump to the instruction indicated by A. The following combinations represent certain conditions for the jump.

Digit 14 High - Jump if result of ALU Operation is greater than 0
Digit 15 High - Jump if result of ALU Operation is equal to 0
Digit 16 High - Jump if result of ALU Operation is less than 0

A jump instruction that combines multiple conditions (e.g. greater than or equal to) can be achieved by setting multiple bits high. An unconditional jump happens when all bits are high, and no jump happens if all bits are low.


### Examples:

The following is a program that can multiply any two numbers (indicated by the 00 and 01 registers in the RAM) and store the result in the RAM:

//Initialization
01 00000000000000 (Data instruction: set Address to 0)
00 0100 111 11 11  000 (ALU instruction: B = RAM; Don’t jump)

//Loop
01 0000000000001 (Data instruction: set Address to 1)
00 0001 001 11 10 000 (ALU instruction: RAM = RAM - Address (1); Don’t jump)
11 00000000001011 (Data instruction: set A to 1110)
00 0000 111 11 11 011 (ALU instruction: RAM; Jump to A (13) if RAM ≤ 0)
01 00000000000000 (Data instruction: set Address to 0)
00 0001 000 11 01  000 (ALU instruction: RAM = RAM+B; Don’t jump)
11 00000000000011 (Data instruction: set A to 3)
 00 0000 000 00 00 111 (Unconditional jump to instruction A)

//Store the answer in register 3
01 00000000000000 (Data instruction: set Address to 0)
00 1000 111 11 11  000 (ALU instruction: A = RAM; Don’t jump)
01 00000000000011 (Data instruction: set Address to 3)
00 0001 111 00 00 000 (ALU instruction: RAM = A; Don’t jump)
00 0000 000 00 00 000 (Doesn’t do anything; ALU instruction: A+A; Don’t jump)

