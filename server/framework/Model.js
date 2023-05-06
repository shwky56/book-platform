
class Model {
    constructor(conechn) {
        this.tableName = this.constructor.name;
        this.pool = conechn;
    }

    async all() {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }

    async get(id) {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
        return rows[0];
    }

    async find(params) {
        let query = `SELECT * FROM ${this.tableName} WHERE `;
        let values = [];
        let keys = Object.keys(params);

        keys.forEach((key, i) => {
            const value = params[key];
            if (typeof value === 'string' && (value.includes('&') || value.includes('|'))) {
                // Handle queries with multiple values separated by & or |
                const op = value.includes('&') ? 'AND' : 'OR';
                const subValues = value.split(op === 'AND' ? '&' : '|');
                subValues.forEach((subValue, j) => {
                    query += `${key} = ?`;
                    if (j < subValues.length - 1) {
                        query += ` ${op} `;
                    }
                    values.push(subValue);
                });
            } else {
                // Handle single values
                query += `${key} = ?`;
                if (i < keys.length - 1) {
                    query += ' AND ';
                }
                values.push(value);
            }
        });
        console.log(query, values);
        const [rows] = await this.pool.query(query, values);
        return rows;
    }

    async search(field, term) {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE ${field} LIKE ?`, [`${term}%`]);
        return rows;
    }


    async create(data) {
        const [result] = await this.pool.query(`INSERT INTO ${this.tableName} SET ?`, data);
        return result.insertId;
    }

    async update(id, data) {
        await this.pool.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [data, id]);
    }

    async delete(id) {
        await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    }
}


export default Model;
