import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { categoryService } from "../services/categoryService";

const Category_QUERY_KEY = "Category";

export const useCategoryHooks = () => {
  const CategoryConfig: CrudHooksConfig<any> = {
    service: categoryService,
    queryKey: Category_QUERY_KEY,
  };

  return createCrudHooks(CategoryConfig);
};

export const useCreateCategory = () => useCategoryHooks().useCreate();
export const useUpdateCategory = (id: Identifier) => useCategoryHooks().useUpdate(id);
export const useDeleteCategory = () => useCategoryHooks().useDelete();
export const useFetchAllCategory = (filters?: string) => useCategoryHooks().useFetchAll(filters);
export const useFetchCategoryById = (id: Identifier) => useCategoryHooks().useFetchById(id);
