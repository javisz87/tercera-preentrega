export class DefaultRepository {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  get dao() {
    return this.#dao;
  }

  add(element) {
    return this.#dao.add(element);
  }

  findOne(condition) {
    return this.#dao.findOne(condition);
  }

  findOneById(condition) {
    return this.#dao.findOneById(condition);
  }

  findMany(condition) {
    return this.#dao.findMany(condition);
  }

  updateOne(condition, upddata) {
    return this.#dao.updateOne(condition, upddata);
  }

  updateMany(condition, upddata) {
    return this.#dao.updateMany(condition, upddata);
  }

  deleteOne(condition) {
    return this.#dao.deleteOne(condition);
  }

  deleteMany(condition) {
    return this.#dao.deleteMany(condition);
  }

  findOnePop(condition, options) {
    return this.#dao.findOnePop(condition, ...options);
  }

  findManyPop(condition, options) {
    return this.#dao.findManyPop(condition, ...options);
  }

  getPaginatedElements(option, data) {
    return this.#dao.getPaginatedElements(option, data);
  }
}
