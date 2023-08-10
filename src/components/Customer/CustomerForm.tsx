import { Modal, Button, Form } from "react-bootstrap";
import { Customer } from "../../services/customerService";

interface CustomerFormPropType {
    onCloseModal: () => void;
    formData?: CustomerPayloadType
}

export type CustomerPayloadType = Omit<Customer, 'id'>

function CustomerForm({ onCloseModal, formData }: CustomerFormPropType) {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        // Access form values directly from the event object
        const formData = new FormData(e.currentTarget);
        const payload: CustomerPayloadType = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        }
        console.log({ payload })
    }

    return (
        <Modal show={true} onHide={onCloseModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{formData ? 'Edit' : 'Create'} Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="name" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            defaultValue={formData?.name}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            defaultValue={formData?.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="phone" className="mb-4">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="string"
                            name="phone"
                            pattern="^\d+(?:-\d+)*$"
                            defaultValue={formData?.phone}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" >
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>

            </Form>
        </Modal>
    );
}

export default CustomerForm;
