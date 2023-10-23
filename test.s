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
	subq	$56, %rsp
	.seh_stackalloc 56
	.seh_endprologue
	movl	$80, 52(%rsp)
	movl	52(%rsp), %eax
	subl	$30, %eax
	movl	%eax, 36(%rsp)                  # 4-byte Spill
	movl	%eax, 52(%rsp)
	movl	52(%rsp), %edx
	leaq	.L.str(%rip), %rcx
	callq	printf
                                        # kill: def $ecx killed $eax
	movl	36(%rsp), %eax                  # 4-byte Reload
	movl	%eax, 48(%rsp)
	movl	48(%rsp), %eax
	subl	$10, %eax
	movl	%eax, 40(%rsp)                  # 4-byte Spill
	movl	%eax, 48(%rsp)
	movl	48(%rsp), %edx
	leaq	.L.str(%rip), %rcx
	callq	printf
                                        # kill: def $ecx killed $eax
	movl	40(%rsp), %eax                  # 4-byte Reload
	movl	%eax, 44(%rsp)
	movl	44(%rsp), %eax
	addl	$20, %eax
	movl	%eax, 44(%rsp)
	movl	44(%rsp), %edx
	leaq	.L.str(%rip), %rcx
	callq	printf
	xorl	%eax, %eax
	addq	$56, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.section	.rdata,"dr"
.L.str:                                 # @.str
	.asciz	"%d\n"

	.addrsig
	.addrsig_sym printf
