import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { CommonModule } from '@angular/common';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  errorMessage = '';

  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.plantService.getNotifications().subscribe({
      next: (notifications: Notification[]) => {
        console.log('Notifications loaded:', notifications);
        this.notifications = notifications;
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        this.errorMessage = 'Failed to load notifications';
      }
    });
  }

  markAsRead(notificationId: number) {
    this.plantService.markNotificationAsRead(notificationId).subscribe({
      next: () => {
        console.log(`Notification ${notificationId} marked as read`);
        this.notifications = this.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        );
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
        this.errorMessage = err.message || 'Failed to mark notification as read';
      }
    });
  }
}