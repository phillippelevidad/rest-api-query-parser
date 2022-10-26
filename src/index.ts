import { normalizeInputFilter } from "./normalizers/normalizeInputFilter";
import { translateFilterToMongoDb } from "./translators/mongoDb/translateFilterToMongoDb";

const inputFilter = {
  name: "Phill",
  roles: { in: [null, "admin", "other"] },
  or: {
    age: { gte: 18, lte: 100 },
    isEnabled: true,
  },
};

const filter = normalizeInputFilter(inputFilter);
console.warn("Filter tree:");
console.dir(filter, { depth: 10 });

const mongoDbFilter = translateFilterToMongoDb(filter);
console.warn("MongoDB filter:");
console.dir(mongoDbFilter, { depth: 10 });
