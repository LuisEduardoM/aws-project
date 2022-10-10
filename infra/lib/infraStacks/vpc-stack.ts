import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { MyStackProps } from "../InfraProps/my-stack-props";

export class VpcStack extends Stack {

    readonly vpc: Vpc

    constructor(scope: Construct, id: string, props?: StackProps){
        super(scope, id, props);

        this.vpc = new Vpc(this, 'vcp01', {
            maxAzs: 3
        })
    }
} 