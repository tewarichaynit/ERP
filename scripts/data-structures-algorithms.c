#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Data Structures for ERP System

// Student Structure
typedef struct {
    char studentId[20];
    char name[100];
    char email[100];
    int semester;
    float cgpa;
    char department[50];
} Student;

// Hostel Room Structure
typedef struct {
    char roomNumber[10];
    int capacity;
    int occupied;
    char hostelName[50];
} HostelRoom;

// Fees Structure
typedef struct {
    char feeType[50];
    float amount;
    float paid;
    char status[20];
} FeeRecord;

// Binary Search Tree Node for Students
typedef struct TreeNode {
    Student student;
    struct TreeNode* left;
    struct TreeNode* right;
} TreeNode;

// Function to create a new tree node
TreeNode* createNode(Student student) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    node->student = student;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// Insert student into BST
TreeNode* insertStudent(TreeNode* root, Student student) {
    if (root == NULL) {
        return createNode(student);
    }
    
    if (strcmp(student.studentId, root->student.studentId) < 0) {
        root->left = insertStudent(root->left, student);
    } else {
        root->right = insertStudent(root->right, student);
    }
    
    return root;
}

// Search student in BST
TreeNode* searchStudent(TreeNode* root, char* studentId) {
    if (root == NULL) {
        return NULL;
    }
    
    int cmp = strcmp(studentId, root->student.studentId);
    
    if (cmp == 0) {
        return root;
    } else if (cmp < 0) {
        return searchStudent(root->left, studentId);
    } else {
        return searchStudent(root->right, studentId);
    }
}

// In-order traversal to print all students
void inorderTraversal(TreeNode* root) {
    if (root == NULL) return;
    
    inorderTraversal(root->left);
    printf("ID: %s, Name: %s, Semester: %d, CGPA: %.2f\n",
           root->student.studentId, root->student.name,
           root->student.semester, root->student.cgpa);
    inorderTraversal(root->right);
}

// Quick Sort for sorting students by CGPA
int compare(const void* a, const void* b) {
    Student* s1 = (Student*)a;
    Student* s2 = (Student*)b;
    return (s2->cgpa > s1->cgpa) ? 1 : -1;
}

// Hash Table for quick student lookup
#define HASH_SIZE 1000

typedef struct {
    Student* students[HASH_SIZE];
    int count;
} HashTable;

// Hash function
int hashFunction(char* studentId) {
    int hash = 0;
    for (int i = 0; studentId[i] != '\0'; i++) {
        hash = (hash * 31 + studentId[i]) % HASH_SIZE;
    }
    return hash;
}

// Insert into hash table
void insertIntoHashTable(HashTable* table, Student student) {
    int index = hashFunction(student.studentId);
    table->students[index] = (Student*)malloc(sizeof(Student));
    *table->students[index] = student;
    table->count++;
}

// Search in hash table
Student* searchInHashTable(HashTable* table, char* studentId) {
    int index = hashFunction(studentId);
    if (table->students[index] != NULL &&
        strcmp(table->students[index]->studentId, studentId) == 0) {
        return table->students[index];
    }
    return NULL;
}

// Queue for hostel room allocation
typedef struct {
    char studentId[20];
    int priority;
} AllocationRequest;

typedef struct {
    AllocationRequest* requests;
    int front;
    int rear;
    int size;
} Queue;

// Create queue
Queue* createQueue(int size) {
    Queue* q = (Queue*)malloc(sizeof(Queue));
    q->requests = (AllocationRequest*)malloc(size * sizeof(AllocationRequest));
    q->front = 0;
    q->rear = -1;
    q->size = size;
    return q;
}

// Enqueue
void enqueue(Queue* q, AllocationRequest request) {
    if (q->rear < q->size - 1) {
        q->requests[++q->rear] = request;
    }
}

// Dequeue
AllocationRequest dequeue(Queue* q) {
    return q->requests[q->front++];
}

// Main demonstration
int main() {
    printf("=== GEHU ERP System - Data Structures Demo ===\n\n");
    
    // Create and insert students into BST
    TreeNode* root = NULL;
    
    Student s1 = {"STU001", "Rajesh Kumar", "rajesh@gehu.ac.in", 4, 8.5, "CSE"};
    Student s2 = {"STU002", "Priya Singh", "priya@gehu.ac.in", 3, 8.8, "ECE"};
    Student s3 = {"STU003", "Arjun Patel", "arjun@gehu.ac.in", 2, 7.9, "ME"};
    
    root = insertStudent(root, s1);
    root = insertStudent(root, s2);
    root = insertStudent(root, s3);
    
    printf("Students in BST (In-order):\n");
    inorderTraversal(root);
    printf("\n");
    
    // Search student
    printf("Searching for STU002:\n");
    TreeNode* found = searchStudent(root, "STU002");
    if (found) {
        printf("Found: %s - %s\n\n", found->student.studentId, found->student.name);
    }
    
    // Hash table demonstration
    printf("Hash Table Demonstration:\n");
    HashTable table;
    table.count = 0;
    insertIntoHashTable(&table, s1);
    insertIntoHashTable(&table, s2);
    
    Student* result = searchInHashTable(&table, "STU001");
    if (result) {
        printf("Hash Search Found: %s\n\n", result->name);
    }
    
    // Queue for hostel allocation
    printf("Hostel Allocation Queue:\n");
    Queue* allocationQueue = createQueue(10);
    
    AllocationRequest req1 = {"STU001", 1};
    AllocationRequest req2 = {"STU002", 2};
    AllocationRequest req3 = {"STU003", 1};
    
    enqueue(allocationQueue, req1);
    enqueue(allocationQueue, req2);
    enqueue(allocationQueue, req3);
    
    printf("Processing allocations:\n");
    for (int i = 0; i < 3; i++) {
        AllocationRequest req = dequeue(allocationQueue);
        printf("Allocated room to: %s (Priority: %d)\n", req.studentId, req.priority);
    }
    
    return 0;
}
