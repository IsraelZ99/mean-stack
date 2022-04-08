module.exports = function(app) {
    const taskCtrl = require('../controllers/task');

    app.route('/api/tasks')
    .get(taskCtrl.list_all_tasks)
    .post(taskCtrl.create_task);

    app.route('/api/tasks/:taskId')
    .get(taskCtrl.read_task)
    .put(taskCtrl.update_task)
    .delete(taskCtrl.delete_task);

}