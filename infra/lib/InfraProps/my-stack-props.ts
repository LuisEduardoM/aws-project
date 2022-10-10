import { StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster } from "aws-cdk-lib/aws-ecs";

export interface MyStackProps extends StackProps {
    vpc?: Vpc
    cluster?: Cluster
}