	.text
	.def	@feat.00;
	.scl	3;
	.type	0;
	.endef
	.globl	@feat.00
.set @feat.00, 0
	.file	"test.ll"
	.def	main;
	.scl	2;
	.type	32;
	.endef
	.globl	main                            # -- Begin function main
	.p2align	4, 0x90
main:                                   # @main
.seh_proc main
# %bb.0:
	subq	$40, %rsp
	.seh_stackalloc 40
	.seh_endprologue
	movl	$10, 36(%rsp)
	movl	36(%rsp), %eax
	movl	$2, %ecx
	cltd
	idivl	%ecx
	movl	%edx, 36(%rsp)
	movl	36(%rsp), %edx
	leaq	.L.str(%rip), %rcx
	callq	printf
	xorl	%eax, %eax
	addq	$40, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.section	.rdata,"dr"
.L.str:                                 # @.str
	.asciz	"%d\n"

	.addrsig
	.addrsig_sym printf
