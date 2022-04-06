## Resumo kubernetes

Relação de dependência:

service -> deployment -> replicaset -> pod

**Os objetos dentro de um cluster k8s se comunicam através de labels e selector que definimos nos arquivos de manifesto.**

service: Permite acesso aos pods que pode estar em qualquer máquina do cluster kubernetes. Ele pode user ClusterIP, NodePort ou LoadBalancer

  - ClusterIP: utilizado internamente dentro de um cluster, resolvido pelo dns (nome do pod)
  - NodePort: pode ser acessível externamente, abrindo uma porta entre 30000 e 30667. Ou seja, usando qq IP de uma máquina do cluster k8s, apenas alterando a porta. Muito utilizado no onprimise
  - LoadBalancer: Mais usado em cenários em cloud, onde um IP público é criado para que seja possível acessar o pod dentro do cluster k8s

deployment: Controla 1 ou mais replicaset, identifica quando algo como a tag da imagem é alterada e duplica um replicaset, mantendo histórico, desativa o primeiro, permite rollback e etc

replicaset: Controla um conjunto de pods, garantindo a resiliência e a replicabilidade dos pods. Onde, se 3 replicas forem definidas, ele garante que sempre hajam 3 pods disponíveis, mesmo que eles caiam por algum motivo

pod: Menor unidade no k8s, pode contemplar diversos containers através de sidecars mas a idéia que ele seja um recurso replicável e stateless (não guarda estado, podendo cair e voltar a qq momento sem problemas)

## Recursos utilizados

- WSL2
- Ubuntu 20
- Windows terminal
- kubectl
- k3d

## Criando cluster k8s usando k3d

```bash
k3d cluster create meucluster --agents 3 --servers 2 -p "8080:30000@loadbalancer"

# Obs. o binding de porta é necessário pois o WSL não disponibiliza o IP do container docker para o windows
# Ficando assim: k3d cluster create meucluster --agents 3 --servers 2
```

## Lista todos os recursos (pods, replicasets, deployments, services) com e sem filtro

```bash
kubectl get <resource>
kubectl get <resource> -l name=<label-name>
kubectl get <resource> -l app=<label-name> # depende de como foi criado no manifesto

kubectl get pods
kubectl get pods -l name=web
kubectl get nodes
kubectl get replicasets
kubectl get deployments
kubectl get services
kubectl get all
```

## Pegar detales de um recursos (pods, replicasets, deployments, services)

```bash
kubectl describe <resource-type>/<name-resource>

kubectl describe pod/meupod
```

## Criar recursos (pods, replicasets, deployments, services) usando arquivo de manifesto

```bash
kubectl create -f <manifesto-file-name>.yaml

kubectl create -f pod.yaml
```

## Criar/Atualiza recursos (pods, replicasets, deployments, services) usando arquivo de manifesto

```bash
kubectl apply -f <manifesto-file-name>.yaml

kubectl apply -f pod.yaml
```

## Deletar/derruba um recurso usando ou não arquivo manifesto

```bash
kubectl delete <resource-type> <name-resource>
kubectl delete -f <manifesto-file-name>.yaml

kubectl delete pod meupod
kubectl delete -f pod.yaml

```

## Descobrir recursos disponíveis, versão do recurso a ser utilizada e etc

```bash
kubectl api-resources
```

## Fazer binding da porta de um pod com o host

```bash
kubectl port-forward <resource-type>/<name-resource> <host-pord>:<pod-port>

kubectl port-forward pod/meupod 8080:80
```

## Escalar replicas manualmente (sem alterar o arquivo de manifesto)

```bash
kubectl scale replicaset <replicaset-name> --replicas <replicas-number>

kubectl scale replicaset meureplicaset --replicas 10
```

## Gerenciando versões de deployments

```bash
# Aplica deployment
kubectl apply -f <deployment-manifest-filename>.yaml

# Muda a imagem que o pod está utilizando e reaplica imagem
kubectl apply -f <deployment-manifest-filename>.yaml

# Observa o histórico de versões do deployment
kubectl rollout history deployment <deployment-name>
kubectl rollout history deployment meudeployment

# Rollback de uma versão do deployment
kubectl rollout undo deployment <deployment-name>
kubectl rollout undo deployment meudeployment

# Identifica a replicaset utilizada nesse momento
kubectl get replicaset
```

## Acessando um serviço NodePort pelo WSL2

```bash
# Cria o serviço com deployment e etc
kubectl apply -f service.yaml

# Confirma que o NodePort foi criado fazendo o bind na porta 30000
kubectl get service

# NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
# kubernetes   ClusterIP   10.43.0.1      <none>        443/TCP        7m3s
# web          NodePort    10.43.229.27   <none>        80:30000/TCP   3m14s

wget http://localhost:8080

```


### Caso esteja usando diretamente no linux, fora do WSL2, usar a sequencia a baixo e não forçar a porta na hora de subir o cluster com k3d

```bash

# Cria o serviço com deployment e etc
kubectl apply -f service-out-of-wsl.yaml

# Os dois proximos passos são necessários pois estamos usando k3d que monta o cluster usando docker
# Lista cluster k8s montado pelo k3d via docker
docker ps

# Escolhe um container, pega o PID e inspeciona o container para encontrarmos seu IP
docker inspect e8f5002c2400 # "IPAddress": "172.23.0.3",

# Uma vez que pegou o IP, é a hora de pegar a porta que o service NodePort criou
kubectl get service

# NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
# kubernetes   ClusterIP   10.43.0.1       <none>        443/TCP        4h1m
# web          NodePort    10.43.235.108   <none>        80:30216/TCP   14m

# Acessa o serviço
wget http://172.23.0.3:30216

```

## Deletando cluster k8s usando k3d

```bash
k3d cluster delete meucluster
# Obs. o binding de IP é necessário pois o WSL não disponibiliza o IP do container docker para o windows
```

## Doc oficial

```bash
devel@SPOFLNTB0408:~/projects/curso-kubernetes$ kubectl --help
kubectl controls the Kubernetes cluster manager.

 Find more information at: https://kubernetes.io/docs/reference/kubectl/overview/

Basic Commands (Beginner):
  create        Create a resource from a file or from stdin
  expose        Take a replication controller, service, deployment or pod and expose it as a new Kubernetes service
  run           Run a particular image on the cluster
  set           Set specific features on objects

Basic Commands (Intermediate):
  explain       Get documentation for a resource
  get           Display one or many resources
  edit          Edit a resource on the server
  delete        Delete resources by file names, stdin, resources and names, or by resources and label selector

Deploy Commands:
  rollout       Manage the rollout of a resource
  scale         Set a new size for a deployment, replica set, or replication controller
  autoscale     Auto-scale a deployment, replica set, stateful set, or replication controller

Cluster Management Commands:
  certificate   Modify certificate resources.
  cluster-info  Display cluster information
  top           Display resource (CPU/memory) usage
  cordon        Mark node as unschedulable
  uncordon      Mark node as schedulable
  drain         Drain node in preparation for maintenance
  taint         Update the taints on one or more nodes

Troubleshooting and Debugging Commands:
  describe      Show details of a specific resource or group of resources
  logs          Print the logs for a container in a pod
  attach        Attach to a running container
  exec          Execute a command in a container
  port-forward  Forward one or more local ports to a pod
  proxy         Run a proxy to the Kubernetes API server
  cp            Copy files and directories to and from containers
  auth          Inspect authorization
  debug         Create debugging sessions for troubleshooting workloads and nodes

Advanced Commands:
  diff          Diff the live version against a would-be applied version
  apply         Apply a configuration to a resource by file name or stdin
  patch         Update fields of a resource
  replace       Replace a resource by file name or stdin
  wait          Experimental: Wait for a specific condition on one or many resources
  kustomize     Build a kustomization target from a directory or URL.

Settings Commands:
  label         Update the labels on a resource
  annotate      Update the annotations on a resource
  completion    Output shell completion code for the specified shell (bash or zsh)

Other Commands:
  api-resources Print the supported API resources on the server
  api-versions  Print the supported API versions on the server, in the form of "group/version"
  config        Modify kubeconfig files
  plugin        Provides utilities for interacting with plugins
  version       Print the client and server version information

Usage:
  kubectl [flags] [options]

Use "kubectl <command> --help" for more information about a given command.
Use "kubectl options" for a list of global command-line options (applies to all commands).
```
