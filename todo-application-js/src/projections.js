const chalk = require('chalk')

class ProjectionsClient {

  constructor(serializedClient) {
    this.client = serializedClient.projectionsClient()
  }

  async updateProjections() {
    await this.createStatsProjection();
    await this.createListsProjection();
  }

  async createStatsProjection() {
    try {
      console.log(`Updating projection: ${chalk.green.bold('list-stats')}`);
      const request = {
        projectionName: 'list-stats',
        feedName: 'todo-list',
        aggregated: true,
        handlers: [
          {
            eventType: "TodoListCreated",
            functions: [{function: "inc", targetSelector: "$.projection.listCount"}]
          },
          {
            eventType: "TodoAdded",
            functions: [{function: "inc", targetSelector: "$.projection.todoCount",}]
          },
        ]
      };
      await this.client.createOrUpdateDefinition(request)
    } catch (e) {
      console.log('Error response: ', e);
    }
  }

  async createListsProjection() {
    try {
      console.log(`Updating projection: ${chalk.green.bold('lists')}`);
      await this.client.createOrUpdateDefinition({
        projectionName: 'lists',
        feedName: 'todo-list',
        handlers: [
          {
            eventType: "TodoListCreated",
            functions: [
              {function: "set", eventSelector: "$.event.name", targetSelector: "$.projection.name"},
              {function: "set", eventSelector: "$.metadata.aggregateId", targetSelector: "$.projection.listId"}
            ]
          },
          {
            eventType: "TodoAdded",
            functions: [{function: "push", targetSelector: "$.projection.todos"}]
          },
          {
            eventType: "TodoCompleted",
            functions: [{
              function: "set",
              targetSelector: "$.projection.todos[?].status",
              targetFilter: "[?(@.todoId == $.event.todoId)]",
              rawData: "COMPLETED"
            }]
          },
          {
            eventType: "TodoListCompleted",
            functions: [{
              function: "set",
              targetSelector: "$.projection.status",
              rawData: "COMPLETED"
            }]
          },
        ]
      })
    } catch (e) {
      console.log('Error response: ', e);
    }

  }

  async findListProjections() {
    return (await this.client.listSingleProjections({projectionName: 'lists'})).projections;
  }

  async findListStats() {
    return await this.client.getAggregatedProjection({projectionName: 'list-stats'})
  }

  async findListProjection(listId) {
    return await this.client.getSingleProjection({
      projectionName: 'lists',
      projectionId: listId
    });
  }

}


module.exports = {ProjectionsClient}
