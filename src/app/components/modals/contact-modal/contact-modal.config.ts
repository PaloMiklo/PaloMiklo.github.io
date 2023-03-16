import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageModel, MessageModelFields } from "src/app/core/forms/model/message";

export const contactForm = (): FormGroup<MessageModel> => {
    const fb = new FormBuilder();

    const fg = fb.nonNullable.group<MessageModel>({
        [MessageModelFields.NAME]: fb.control('', { nonNullable: true, validators: Validators.required }),
        [MessageModelFields.EMAIL]: fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
        [MessageModelFields.MESSAGE]: fb.control('', { nonNullable: true, validators: Validators.required })
    });

    return fg;
}