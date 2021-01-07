<?php

namespace App\Controller;

use App\Repository\EmployeeRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class employeeSiteController
 * @package App\Controller
 *
 * @Route(path="/employee")
 */
class EmployeeController
{
    private $employeeRepository;

    public function __construct(EmployeeRepository $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    /**
     * @Route("/add", name="add_employee", methods={"POST"})
     */
    public function addEmployee(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $name = $data['name'];
        $email = $data['email'];
        $phone = $data['phone'];
        $role = $data['role'];

        if (empty($name) || empty($email) || empty($phone) || empty($role)) {
            throw new NotFoundHttpException('Expecting mandatory parameters!');
        }

        $this->employeeRepository->saveemployee($firstName, $lastName, $email, $phoneNumber);

        return new JsonResponse(['status' => 'employee added!'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/get/{id}", name="get_one_employee", methods={"GET"})
     */
    public function getOneEmployee($id): JsonResponse
    {
        $employee = $this->employeeRepository->findOneBy(['id' => $id]);

        $data = [
            'id' => $employee->getId(),
            'name' => $employee->getname(),
            'email' => $employee->getemail(),
            'phone' => $employee->getphone(),
            'role' => $employee->getrole(),
        ];

        return new JsonResponse(['employee' => $data], Response::HTTP_OK);
    }

    /**
     * @Route("/get-all", name="get_all_employees", methods={"GET"})
     */
    public function getAllEmployees(): JsonResponse
    {
        $employees = $this->employeeRepository->findAll();
        $data = [];

        foreach ($employees as $employee) {
            $data[] = [
                'id' => $employee->getId(),
                'name' => $employee->getname(),
                'email' => $employee->getemail(),
                'phone' => $employee->getphone(),
                'role' => $employee->getrole(),
            ];
        }

        return new JsonResponse(['employees' => $data], Response::HTTP_OK);
    }

    /**
     * @Route("/update/{id}", name="update_employee", methods={"PUT"})
     */
    public function updateEmployee($id, Request $request): JsonResponse
    {
        $employee = $this->employeeRepository->findOneBy(['id' => $id]);
        $data = json_decode($request->getContent(), true);

        $this->employeeRepository->updateemployee($employee, $data);

        return new JsonResponse(['status' => 'employee updated!']);
    }

    /**
     * @Route("/delete/{id}", name="delete_employee", methods={"DELETE"})
     */
    public function deleteEmployee($id): JsonResponse
    {
        $employee = $this->employeeRepository->findOneBy(['id' => $id]);

        $this->employeeRepository->removeemployee($employee);

        return new JsonResponse(['status' => 'employee deleted']);
    }
}
