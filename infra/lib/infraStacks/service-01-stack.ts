import { Duration, Stack } from "aws-cdk-lib";
import { EcsApplication } from "aws-cdk-lib/aws-codedeploy";
import { Cluster, ContainerImage, LogDriver } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";
import { MyStackProps } from "../InfraProps/my-stack-props";

export class Service01Stack extends Stack {

    constructor(scope: Construct, id: string, props: MyStackProps) {
        super(scope, id, props);


        const service01 = new ApplicationLoadBalancedFargateService(this, 'ALB01', {
            serviceName: 'service-01',
            cluster: props?.cluster,
            cpu: 512,
            memoryLimitMiB: 1024,
            desiredCount: 2,
            listenerPort: 8080,
            taskImageOptions: {
                containerName: 'aws_project01',
                image: ContainerImage.fromAsset('../aws-project-01'),
                containerPort: 8080
            },
            publicLoadBalancer: true
        })

        service01.targetGroup.configureHealthCheck({
            path: '/actuator/health',
            healthyHttpCodes: '200',
            port: '8080'
        })
        
        const autoScaleTask = service01.service.autoScaleTaskCount({
            minCapacity: 2,
            maxCapacity: 4
        })

        autoScaleTask.scaleOnCpuUtilization('service01AutoScaling', {
            targetUtilizationPercent: 50,
            scaleInCooldown: Duration.seconds(60),
            scaleOutCooldown: Duration.seconds(60)
        })
    }
}