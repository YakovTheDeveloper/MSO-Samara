import { ref, computed, watch, type Ref } from "vue";

export function useOfflinePagination<T>(items: T[] | Ref<T[]>) {
    const currentPage = ref(1);
    const pageSize = ref(8); // Default to 5 or any sensible number

    const itemsRef = computed(() => Array.isArray(items) ? items : items.value);

    const totalPages = computed(() =>
        Math.max(1, Math.ceil(itemsRef.value.length / pageSize.value))
    );

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        return itemsRef.value.slice(start, start + pageSize.value);
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

    // Watch for changes in items/pageSize to keep currentPage in range
    watch([itemsRef, pageSize], () => {
        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value;
        }
    });

    return {
        currentPage,
        pageSize,
        totalPages,
        paginatedItems,
        next,
        prev,
    };
}
