import { mergeFilters } from "./helpers/mergeFilters";
import { FILTER_EQUALS } from "./models/operators";
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

// Normaliza um filtro de entrada, ex. que veio de uma chamada de API.
// Gera um formato intermediário, que pode ser retrabalhado e
// traduzido para qualquer formato de banco de dados.
const filter = normalizeInputFilter(inputFilter);
console.log("Filter tree:");
console.dir(filter, { depth: 10 });

// Mescla dois filtros em um único filtro.
// Útil para mesclar filtros de entrada com filtros de segurança.
const augmentedFilter = mergeFilters(filter, [
  { field: "createdBy", operator: FILTER_EQUALS, value: "John" },
]);

// Traduz um filtro intermediário para um filtro específico de um banco de dados.
const mongoDbFilter = translateFilterToMongoDb(augmentedFilter, {
  remapFieldNames: { id: "_id" },
});
console.log("MongoDB filter:");
console.dir(mongoDbFilter, { depth: 10 });
