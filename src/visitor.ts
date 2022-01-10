// playground for the visitor pattern
// This isn't quite right. Hmmmm.
// See my sketch on paper, which is closer than this. Revise this code to match.
// See also https://www.typescriptlang.org/play?ssl=19&ssc=1&pln=25&pc=1#code/PTAEBUCcE8EsDsDmoAuB7UiCmLQENQALPeAEwBstQ15VCqAiLADwAdIsBnT2G0dtACNKAWwYAoEERQpWnAFwgAxpDwAzFAkQIUWSOxx7OAOiVoRwDgc5Z4mpAFozpLMcIoR5AMQp6DltY8NA4Cwlgi4pFS7rIKIADuicYA1rCQsOTkAG54POQonGhZpubA8en2iMBZsDzokCF4MnrwDijQrFwqsKwowFEAVAPioAOgAJpoAK6gInjQRHhZVPBomkpYpHRNdHpUtaCrh1ibqBhKeJm7oAAiqvF4YaA6emp4G7f3j5TGoCNj4GIuAOKEgU1coAAysROgA1WqweqgC60QT7ESsUS2XRbQQLObwBakWBqNR7OzI8i5GycAA0f1GhzWoAAVlNOLg7nh4npQIIprhLoVQAAxDJcaAc8LUSCgACC8Fgc10MtA8SBWGWkF+-1AAHUqA8Keg+VRvmalBtevgrmg1LsRGrEYRprhNoitKBNXoFpwYVQlFTuDrGYCmgByThqwgLRH8SBCb74vDJLigGzwGxnVns3AXK5x+F1c3QvCdVWFEQ4QhaYz-fovSBvD5ch5PADeI0OeCr8nToK0AG4u+8rSgABQ1OpoSB90twhH1ACUfayaFgpHEAF9Io3m1R51gi4iZ6BO6BQFPEQBhNKBrDjv1lrB92+Qe8ry-rzcXq8oSEAI5THgHCPv6c5ASBWCfmuG5dn+UCwCQiCUGBz59ohyGUDB37bpEgbUp83K8kqmLhNiUaHseSLnpei5vveaGdK+d7YWeXYXheZiZmgPzkGgiDjgABqQ9yegQSisS+oAACTtk+nTGPAPZYFuQlLl2O7wYugHAaBCnSbpUFLuxnGcdxhR8QJwmidy4nppBHB9nJBlKSpakaReWm-oumFIKhBkYekWHQaZZnIjQlmuPxgkiWJSD4KgwX+dJLn+m5VYeZpkQXrZ8RMdJrbmiZtEXq5o5YL046+LUnmgDuWkEdwUKOeiZFVnYUZFR2HHdlWoAALygOG4Y5eZkWglMSj1OOym9v26RICVvVmTVJhzVQQ0bb13n4JalUTn+M5zv61EzstZlHdqf5GaBa11Q1+FBlGDGUM8GJYp1RFtm9pV9Ztw2jb1FmTdNM6zSpfYcotiAXeFF5rRlAPbWZO4XhVVVXSdz5nZAcM+dO130VJ1U1pwD14eITVRn5KFtZ9BTfeaYUXhtg2A2NXETWCYOQBD83Q1o+PhYjbNbSpO0jvtmOLsdUKnbLeMs3RhPGAhyV06TtXZVpUgOPrBuG0bxsm6bhv4RNKsnpAYYoK2UZbVg8TfXo44aSDDl6cjTstV746RgBoAAIzhu7lsDiF7PwD7tOoeGA7B6HkRXbb9vGHlj6tRpKdAmnGcRylGniEAA

// the Visitable thing
interface ASTNode {
  name: string;
  accept(visitor: ExprVisitor): void;
}

// The thing that visits the expressions
interface ExprVisitor {
  // TODO add generic type
  visitAssignmentExpr(astNode: ASTNode): ASTNode;
  visitLiteralExpr(astNode: ASTNode): ASTNode;
}

class PrettyPrintVisitor implements ExprVisitor {
  visitAssignmentExpr(node: ASTNode) {
    console.log("== Assignment Expression ==");
    console.log(JSON.stringify(node));
    console.log("===========================");

    return node;
  }

  visitLiteralExpr(node: ASTNode) {
    console.log("== Literal Expression ==");
    console.log(JSON.stringify(node));
    console.log("========================");

    return node;
  }
}

// I think this should be an Expr
class LiteralNode implements ASTNode {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  accept(visitor: ExprVisitor) {
    visitor.visitLiteralExpr(this);
  }
}

// ---

const printer = new PrettyPrintVisitor();
const thingie = new LiteralNode("blurg");

printer.visitLiteralExpr(thingie);
printer.visitLiteralExpr(thingie);
