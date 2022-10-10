import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";
import { MyStackProps } from "../InfraProps/my-stack-props";


export class ClusterStack extends Stack {

    readonly cluster: Cluster

    constructor(scope: Construct, id: string, props: MyStackProps){
        super(scope, id, props);

        this.cluster = new Cluster(this, id, {
            clusterName: 'cluster-01',
            vpc: props.vpc
        })
    }
} 