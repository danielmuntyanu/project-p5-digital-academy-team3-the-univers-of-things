import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PaginationControls from '@/components/PaginationControls.vue'

describe('PaginationControls', () => {

    function createWrapper(modelValue = 0, totalPages = 5) {
        return mount(PaginationControls, {
            props: {
                modelValue,
                totalPages,
                "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val })
            }
        })
    }

    it("Should have a total pages number in props", () => {
        const wrapper = createWrapper(0, 5);
        const pages = wrapper.findAll(".pag_page");
        expect(pages).toHaveLength(5);
    })

    it("Sould show page 0 if totalPages has not been given.", () => {
        const wrapper = createWrapper(0, 0);
        const page = wrapper.find(".pag_page");
        expect(page.text()).toBe("0");
    })

    it("Should highlight active page with its class 'active' ", () => {
        const wrapper = createWrapper(2, 5);
        const pages = wrapper.findAll(".pag_page");
        expect(pages[2].classes()).toContain("active");
    })

    it("Should no highlight no active pages", () => {
        const wrapper = createWrapper(0, 5);
        const pages = wrapper.findAll(".pag_page");
        expect(pages[1].classes()).not.toContain("active");
    })

    // Previous and Next buttons
    it("Should make left arrow disabled when on page 1", () => {
        const wrapper = createWrapper(0, 5);
        const arrows = wrapper.findAll(".pag_arrows");
        expect(arrows[0].classes()).toContain("disabled");
    })

    it("Should make right arrow disabled when on last page", () => {
        const wrapper = createWrapper(4, 5);
        const arrows = wrapper.findAll(".pag_arrows");
        expect(arrows[1].classes()).toContain("disabled");
    })

    it("Should not make arrows disabled on the page in the middle", () => {
        const wrapper = createWrapper(2, 5);
        const arrows = wrapper.findAll(".pag_arrows");
        expect(arrows[0].classes()).not.toContain("disabled");
        expect(arrows[1].classes()).not.toContain("disabled");
    })

    it("Should do the emit 'update:modelValue' when click", async () => {
        const wrapper = createWrapper(0, 5);
        await wrapper.findAll('.pag_page')[2].trigger("click");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([2]);
    })

    it("Should do emit when right arrow is clicked", async () => {
        const wrapper = createWrapper(0, 5);
        const arrows = wrapper.findAll(".pag_arrows");
        await arrows[1].trigger("click");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([1]);
    })

    it("Should do emit when left arrow is clicked", async () => {
        const wrapper = createWrapper(2, 5);
        const arrows = wrapper.findAll(".pag_arrows");
        await arrows[0].trigger("click");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([1]);
    })

    it("Should no emit when disabled left arrow is clicked", async () => {
        const wrapper = createWrapper(0, 5);
        const arrows = wrapper.findAll(".pag_arrows");
        await arrows[0].trigger("click");
        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    })

    it("Should no emit when disabled right arrow is clicked", async () => {
        const wrapper = createWrapper(4, 5);
        const arrows = wrapper.findAll(".pag_arrows");
        await arrows[1].trigger("click");
        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    })

})