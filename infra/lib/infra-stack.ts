import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ClusterStack } from './infraStacks/cluster-stack';
import { Service01Stack } from './infraStacks/service-01-stack';
import { VpcStack } from './infraStacks/vpc-stack';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpcStack = new VpcStack(this, 'vpc', {})
    

    const clusterStack = new ClusterStack(this, 'cluster', {
      vpc: vpcStack.vpc
    })
    clusterStack.addDependency(vpcStack)

    const service01Stack = new Service01Stack(this, 'Service01', {
      cluster: clusterStack.cluster
    })
    service01Stack.addDependency(clusterStack)
  }
}
