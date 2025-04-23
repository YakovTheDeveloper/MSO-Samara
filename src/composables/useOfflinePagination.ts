import { ref, computed } from "vue";

export function useOfflinePagination<T>(items: T[]) {
    const currentPage = ref(1);
    const pageSize = ref(10); // Default page size, can be updated dynamically

    const totalPages = computed(() => items.length)

    const paginatedItems = computed(() => {
        return items[currentPage.value - 1]
    });

    const next = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
    };

    const prev = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    };

    return {
        currentPage,
        pageSize,
        totalPages,
        paginatedItems,
        next,
        prev,
    };
}