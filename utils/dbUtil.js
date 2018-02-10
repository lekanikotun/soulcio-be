/**
 * @category   MongoDB Utility
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const Promise = require('bluebird');
const ObjectID = require('mongodb').ObjectID;

const DBUtil = (config, db) => {

  /**
   * Get Collection Data by ID
   * @param {String} collection
   * @param {{}} query
   * @param {{}} modifier
   * @return {Promise}
   */
  const getRecordsByQuery = (collection, query = {}, modifier = {}) => {
    return new Promise((resolve, reject) => {
      db.collection(collection)
        .find(query, modifier)
        .toArray((err, results) => {
          if (err) reject(err);
          // db.close();
          resolve(results);
        });
    });
  };

  /**
   * Get Colllection Data by ID
   * @param {String} collection
   * @param {String} id
   * @return {Promise}
   */
  const getRecordByObjId = (collection, id) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).findOne(
        { _id: new ObjectID(id) },
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Get Collection Record using search query
   * @param {String} collection
   * @param {{}} query
   * @param {{}} modifier
   * @return {Promise  | {}}
   */
  const getRecordByQuery = (collection, query = {}, modifier = {}) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).findOne(
        query,
        modifier,
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Add a single record to MongoDB
   * @param collection
   * @param data
   */
  const addRecord = (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insertOne(
        data,
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Add multiple records to MongoDB
   * @param collection
   * @param {[]} data
   */
  const addRecords = (collection, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).insert(
        data,
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Update Admin Form Fields Collection
   * @param {String} collection
   * @param {{}} query
   * @param {{}} data
   * @param {{}} modifier
   * @return {Promise}
   */
  const updateRecordByQuery = (collection, query, data, modifier = {}) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).update(
        query,
        { $set: data },
        modifier,
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Update Admin Form Fields Collection
   * @param {String} collection
   * @param {String} id
   * @param {{}} data
   * @return {Promise}
   */
  const updateRecordByObjId = (collection, id, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).update(
        { _id: new ObjectID(id) },
        { $set: data },
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Update Admin Form Fields Collection
   * @param {String} collection
   * @param {String} id
   * @param {{}} data
   * @return {Promise}
   */
  const updateRecordById = (collection, id, data) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).update(
        { _id: id },
        { $set: data },
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Update Records
   * @param {String} collection
   * @param {{}} query
   * @param {{}} data
   * @param {{}} modifier
   * @return {Promise}
   */
  const updateRecordsByQuery = (collection, query, data, modifier = {}) => {
    return new Promise((resolve, reject) => {
      db.collection(collection).updateMany(
        query,
        { $set: data },
        modifier,
        (err, result) => {
          if (err) reject(err);
          // db.close();
          resolve(result);
        });
    });
  };

  /**
   * Get distinct records in a collection
   * @param collection
   * @param field
   */
  const getDistinct = (collection, field) => {
    return new Promise((resolve, reject) => {
      db.collection(collection)
        .distinct(field, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  };

  return {
    addRecord,
    addRecords,
    getDistinct,
    getRecordByObjId,
    getRecordByQuery,
    getRecordsByQuery,
    updateRecordById,
    updateRecordByObjId,
    updateRecordByQuery,
    updateRecordsByQuery
  };
};

module.exports = DBUtil;
